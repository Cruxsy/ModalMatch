const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const E=require('./engine.js'),products=JSON.parse(fs.readFileSync('./catalog.json','utf8'));
const bca=products.find(x=>x.id==='bca-personal'),kur=products.find(x=>x.id==='mandiri-kur-mikro');
const p={category:'pribadi',purpose:'pribadi',amount:30000000,tenor:36,maxInstallment:1500000,income:6000000,expenses:2500000,debt:500000,other:200000,reserve:500000,emergency:12000000,age:28,bcaMember:true,payroll:'BCA',employmentMonths:36,collateral:'no',businessMonths:24,revenue:40000000,variableCost:18000000,fixedCost:8000000,ownerDraw:4000000};
const u={...p,category:'umkm',purpose:'modal',amount:50000000,maxInstallment:3500000,debt:1000000,reserve:3000000,emergency:30000000};
const results=[];function test(name,fn){try{fn();results.push({name,passed:true})}catch(e){results.push({name,passed:false,error:e.message});}}
const near=(a,b,t=.01)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}`);
test('BCA Rp30m /36 flat 1.07% matches independently calculated Rp1,154,333.33',()=>near(E.cost(bca,3e7,36).installment,1154333.333333));
test('BCA official tenor rate schedule is applied',()=>{near(E.cost(bca,3e7,12).installment,2800000);near(E.cost(bca,3e7,24).installment,1559000);assert.equal(E.cost(bca,3e7,18).installment,null)});
test('Known upfront fees include stamp and minimum provision',()=>{near(E.cost(bca,3e7,36).knownFee,310000);near(E.cost(bca,5e6,36).knownFee,110000)});
test('BCA known totals and net disbursed are distinct',()=>{const c=E.cost(bca,3e7,36);near(c.total,41556000);near(c.net,29690000);near(c.knownTotal,41866000);assert.equal(c.effectiveAnnual,null)});
test('Annuity official BNI example 100m/6%/36 rounded 3,042,194',()=>near(E.payment(1e8,6,36),3042193.745155,0.001));
test('Annuity 50m/6%/36 rounded 1,521,097',()=>near(E.payment(5e7,6,36),1521096.872578,0.001));
test('Zero interest payment equals principal/months',()=>near(E.payment(12000000,0,12),1000000));
test('Effective fixed-principal schedule decreases interest',()=>{const r=E.schedule(12000000,12,12,'effective');near(r[0].payment,1120000);near(r[11].payment,1010000);near(r[11].balance,0)});
test('Amortization principal sums to original principal',()=>{for(const method of ['flat','annuity','effective']){const r=E.schedule(3e7,12.84,36,method);near(r.reduce((s,x)=>s+x.principal,0),3e7);near(r.at(-1).balance,0);}});
test('Unknown rate prevents installment estimation',()=>assert.equal(E.cost(products.find(x=>x.id==='bni-fleksi'),3e7,36).installment,null));
test('Unknown fees remain incomplete, not zero all-in cost',()=>{const c=E.cost(kur,5e7,36);assert.equal(c.feeUnknown,true);assert.equal(c.knownFeeCount,0);assert.equal(c.net,null);assert.equal(c.effectiveAnnual,null)});
test('Conditional admin percentage is counted in known fees',()=>near(E.cost(products.find(x=>x.id==='cimb-xtra-dana'),3e7,36).knownFee,1200000));
test('Personal cash and capacity independent control',()=>{const h=E.health(p);near(h.available,2300000);near(h.capacity,1500000)});
test('Personal 30% salary shock independent control',()=>{const h=E.health(p,{incomeDrop:30});near(h.incoming,4200000);near(h.available,500000);near(h.capacity,500000)});
test('UMKM initial cash excludes owner draw and reserve',()=>{const h=E.health(u);near(h.available,6000000);near(h.capacity,3500000)});
test('UMKM shock scales variable but not fixed costs',()=>{const h=E.health(u,{incomeDrop:20});near(h.available,1600000);near(h.capacity,1080000)});
test('UMKM operating cost rise and debt applied after variable scaling',()=>near(E.health(u,{incomeDrop:20,costRise:10,extraDebt:100000}).available,-740000));
test('Emergency balance is not treated as monthly income',()=>{const h=E.health({...p,emergency:1e10});near(h.capacity,1500000);near(E.health(p,{reserveDraw:5e6}).reserveBalance,7e6)});
test('Within BCA published parameters gives fit',()=>assert.equal(E.match(bca,p).status,'fit'));
test('Above maximum and below minimum give no',()=>{assert.equal(E.match(bca,{...p,amount:2e8}).status,'no');assert.equal(E.match(bca,{...p,amount:1e6}).status,'no')});
test('Invalid product tenor rejected',()=>assert.equal(E.match(bca,{...p,tenor:48}).status,'no'));
test('Insufficient capacity rejected for calculable product',()=>assert.equal(E.match(bca,{...p,maxInstallment:100000}).status,'no'));
test('Missing membership never claims confirmed eligibility',()=>assert.equal(E.match(bca,{...p,bcaMember:false}).status,'confirm'));
test('Conditional KUR never becomes guaranteed quote',()=>assert.equal(E.match(kur,u).status,'confirm'));
test('Business age and collateral hard filters work',()=>{assert.equal(E.match(kur,{...u,businessMonths:2}).status,'no');assert.equal(E.match(products.find(x=>x.id==='bca-kur-kecil'),{...u,amount:150000000}).status,'no')});
test('Investment vs working capital tenors differ',()=>{assert.ok(E.match(kur,{...u,tenor:60}).failed.some(x=>x.includes('Tenor')));assert.ok(!E.match(kur,{...u,tenor:60,purpose:'investasi'}).failed.some(x=>x.includes('Tenor')))});
test('Archived DBS is never matched as active',()=>assert.equal(E.match(products.find(x=>x.id==='dbs-kta-archived'),p).status,'no'));
test('No-result scenario truly fails all relevant products',()=>assert.ok(products.filter(x=>x.active&&x.category==='pribadi').every(x=>E.match(x,{...p,amount:2e9,maxInstallment:100000}).status==='no')));
test('Alternative for 500k capacity calculated, not random',()=>{const a=E.alternative(bca,{...p,maxInstallment:500000});assert.equal(a.amount,12300000);near(a.installment,473276.666667);assert.ok(a.installment<500000)});
test('Alternative rejects loan below product minimum',()=>assert.equal(E.alternative(bca,{...p,maxInstallment:100000}),null));
test('Changing amount changes monthly payments consistently',()=>near(E.cost(bca,6e7,36).installment/E.cost(bca,3e7,36).installment,2));
test('EIR zero-fee annualization matches 12 monthly nominal percent',()=>near(E.effectiveRate(12000000,E.schedule(12000000,12,12,'annuity').map(x=>x.payment)),12.6825030132,0.00001));
test('Invalid calculation inputs do not create spurious installments',()=>{assert.equal(E.payment(-1,6,36),null);assert.equal(E.payment(1,6,0),null);assert.equal(E.payment(1,null,36),null)});
test('Revenue exactly three proposal streams plus operating subtraction',()=>{const r=E.revenue({reports:100,price:25000,referrals:20,commission:50000,banks:1,boostMonthly:500000,operating:3000000});assert.deepEqual(r,{reportRevenue:2500000,referralRevenue:1000000,boostRevenue:6000000,total:9500000,operating:3000000,surplus:6500000,reportsToBreakEven:0})});
test('BEP counts reports after referral and Boost revenue are included',()=>{const r=E.revenue({reports:0,price:25000,referrals:20,commission:50000,banks:1,boostMonthly:500000,operating:9400000});assert.equal(r.reportsToBreakEven,96);assert.equal(r.total,7000000);});
test('Catalog source and completeness audit',()=>{assert.equal(products.length,20);assert.equal(products.filter(p=>p.active).length,19);assert.equal(new Set(products.filter(p=>p.active).map(p=>p.bank)).size,9);for(const p of products){assert.ok(p.urls.length);assert.equal(p.checkedAt,'2026-11-07');assert.equal(p.feesComplete,false);assert.ok(p.notes);for(const u of p.urls)assert.ok(u.startsWith('https://'));}});

test('SCF readiness checklist scores complete inputs as 100 and green-ready',()=>{const r=E.scfReadiness({legal:'complete',records:'monthly',plan:'yes',equity:'yes',disclosure:'yes'});assert.equal(r.score,100);assert.equal(r.status,'ready');});
test('SCF equity unwillingness blocks equity crowdfunding match',()=>{const r=E.scfReadiness({legal:'complete',records:'monthly',plan:'yes',equity:'no',disclosure:'yes'});assert.equal(r.status,'notfit');assert.equal(r.equityCompatible,false);});
test('Equity dilution calculates investor and existing ownership',()=>{const d=E.equityDilution(450000000,50000000);near(d.postMoney,500000000);near(d.investorPct,10);near(d.existingPct,90);});
test('Funding matcher keeps personal credit users outside SCF matching',()=>{const r=E.fundingMatch(products,p,{legal:'complete',records:'monthly',plan:'yes',equity:'yes',disclosure:'yes'});assert.equal(r.available,false);});
test('UMKM funding match identifies SCF as exploratory when readiness is high and bank data needs confirmation',()=>{const r=E.fundingMatch(products,u,{legal:'complete',records:'monthly',plan:'yes',equity:'yes',disclosure:'yes'});assert.equal(r.available,true);assert.equal(r.scf.status,'ready');assert.equal(r.bank.status,'confirm');assert.equal(r.level,'scf');});
test('Funding match does not mark SCF ready when checklist is incomplete',()=>{const r=E.fundingMatch(products,u,{legal:'none',records:'none',plan:'no',equity:'consider',disclosure:'no'});assert.notEqual(r.scf.status,'ready');});

test('Funding match recommends both paths when bank fit and SCF readiness is complete',()=>{const demo={...kur,id:'test-kur-fit',active:true,minAmount:10000000,maxAmount:100000000,minTenor:12,maxTenor:60,rateConditional:false,rateAnnual:6,method:'annuity',feesComplete:true,feeTreatment:'separate',requiresCollateral:false,requiresPayroll:false,stale:false};const r=E.fundingMatch([demo],u,{legal:'complete',records:'monthly',plan:'yes',equity:'yes',disclosure:'yes'});assert.equal(r.bank.status,'fit');assert.equal(r.scf.status,'ready');assert.equal(r.level,'both');});
test('Funding match explains bank confirmation when SCF is not ready',()=>{const r=E.fundingMatch(products,u,{legal:'none',records:'none',plan:'no',equity:'consider',disclosure:'no'});assert.equal(r.bank.status,'confirm');assert.equal(r.level,'bank-confirm');});


// Lightweight application integration checks. Not a browser or visual layout test.
const handlers={},storage=new Map(),elements={};
function element(){return {innerHTML:'',textContent:'',children:[],style:{},classList:{add(){},remove(){}},focus(){},querySelectorAll(){return[]},offsetParent:true};}
const document={activeElement:null,body:{style:{},appendChild(){}},querySelector:s=>elements[s]||(elements[s]=element()),getElementById:()=>null,addEventListener:(k,f)=>handlers[k]=f,createElement:()=>({...element(),click(){},remove(){}})};
const window={KKEngine:E,KK_PRODUCTS:products,scrollTo(){},addEventListener(){},print(){}};
const context={window,document,location:{hash:''},navigator:{onLine:true},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},setTimeout:()=>0,clearTimeout(){},URL,Blob,Intl,Date,console,FormData:global.FormData};vm.createContext(context);vm.runInContext(fs.readFileSync('app.js','utf8'),context);const run=s=>vm.runInContext(s,context);
test('All twelve application views render without exceptions',()=>{for(const name of ['homeView','finderView','resultsView','catalogView','compareView','analysisView','reportsView','profileView','sourcesView','revenueView','fundingView','helpView'])assert.ok(run(name+'()').length>100)});
test('Welcome screen and local account forms render',()=>{run("renderAuth('welcome')");assert.ok(run("document.querySelector('#app').innerHTML").includes('Buat akun ModalMatch'));run("renderAuth('signup')");assert.ok(run("document.querySelector('#app').innerHTML").includes('signup-form'));run("renderAuth('login')");assert.ok(run("document.querySelector('#app').innerHTML").includes('login-form'));});
test('Revenue projection matches proposal targets for three years',()=>{const a=run('state.revenue');const totals=a.years.map(y=>E.revenue({...y,price:a.price,commission:a.commission,boostMonthly:a.boostMonthly}).total);assert.deepEqual(Array.from(totals),[14500000,35000000,55500000]);assert.deepEqual(Array.from(a.years.map(y=>y.banks)),[1,3,5]);});
test('Search filters local catalog dynamically',()=>{run("state.search='BCA';state.category='all';");const html=run('catalogView()');assert.ok(html.includes('BCA Personal Loan'));assert.ok(!html.includes('<h3>BNI Fleksi</h3>'));run("state.search='zzzz-unmatched';");assert.ok(run('catalogView()').includes('Belum menemukan produk'));});
test('Comparison renders known cost and unknown EIR',()=>{run("state.compare=['bca-personal','cimb-xtra-dana'];");const html=run('compareView()');assert.ok(html.includes('41.866.000'));assert.ok(html.includes('Belum dapat ditetapkan'));});
test('Payment failure does not unlock report; success does exactly once',()=>{run("checkout();state.checkout.step='pending';paymentFail();");assert.equal(run('state.reports.length'),0);run("state.checkout.step='pending';paymentSuccess();paymentSuccess();");assert.equal(run('state.reports.length'),1);assert.ok(storage.has('modalmatch-v1'));});
test('Paid report freezes profile values and renders financial results',()=>{run('state.profile.amount=60000000');assert.equal(run('state.reports[0].profile.amount'),30000000);assert.ok(run('reportHtml(state.reports[0])').includes('41.866.000'));});
test('Referral records only prepared demo; revenue inputs unchanged',()=>{run("confirmReferral('bca-personal')");assert.equal(run('state.referrals.length'),1);assert.equal(run('state.referrals[0].status'),'Rujukan disiapkan · demo');assert.equal(run('state.revenue.years[0].referrals'),20);});
test('UMKM journey uses different inputs and calculations',()=>{run("setCategory('umkm')");assert.ok(run('finderView()').includes('Biaya variabel'));assert.ok(run('analysisView()').includes('1.080.000'));assert.ok(run('resultsView()').includes('KUR Mikro'));});

test('Funding page visibly marks recommended SCF route green for complete readiness',()=>{run("setCategory('umkm');state.funding={legal:'complete',records:'monthly',plan:'yes',equity:'yes',disclosure:'yes',preMoney:450000000,raiseAmount:50000000};");const html=run('fundingView()');assert.ok(html.includes('SCF saham lebih siap dieksplorasi'));assert.ok(html.includes('class="funding-card fit recommended"'));assert.ok(html.includes('10%'));assert.ok(html.includes('Sesuai parameter')||html.includes('Perlu konfirmasi'));});
test('Funding page explains personal users cannot use SCF matching',()=>{run("setCategory('pribadi')");const html=run('fundingView()');assert.ok(html.includes('Crowdfunding ditujukan untuk usaha'));assert.ok(html.includes('use-umkm-demo'));});
test('Funding page turns SCF equity status red when owner refuses dilution',()=>{run("setCategory('umkm');state.funding={legal:'complete',records:'monthly',plan:'yes',equity:'no',disclosure:'yes',preMoney:450000000,raiseAmount:50000000};");const html=run('fundingView()');assert.ok(html.includes('Tidak cocok untuk SCF saham'));assert.ok(html.includes('funding-card no'));});

test('No-results view and computed alternatives render',()=>{run("setCategory('pribadi');state.profile.amount=2000000000;state.profile.maxInstallment=100000");assert.ok(run('resultsView()').includes('Belum ada yang sesuai saat ini'));});
test('Input validation rejects negatives and empty revenue',()=>{run('state.profile.amount=-1');assert.ok(run('validateProfile()'));run("setCategory('umkm');state.profile.revenue=0");assert.ok(run('validateProfile()'));});
const passed=results.filter(x=>x.passed).length;
const report={runAt:new Date().toISOString(),passed,total:results.length,scope:'Financial unit tests, catalog audit, Smart Funding Match and dilution tests, and lightweight view/action integration checks; not a real browser test.',results};
fs.writeFileSync('docs/qa-results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(passed!==results.length)process.exitCode=1;
