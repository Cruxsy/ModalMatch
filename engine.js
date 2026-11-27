(function(root){
  'use strict';
  const money = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  function payment(principal,annualRate,months,method='annuity'){
    if(!Number.isFinite(principal)||principal<=0||!Number.isInteger(months)||months<1||annualRate==null||annualRate<0)return null;
    const r=annualRate/100/12;
    if(r===0)return principal/months;
    if(method==='flat')return principal/months+principal*r;
    if(method==='effective')return principal/months+principal*r;
    if(method==='annuity')return principal*r/(1-Math.pow(1+r,-months));
    return null;
  }
  function schedule(principal,annualRate,months,method){
    const pmt=payment(principal,annualRate,months,method);if(pmt===null)return [];
    let balance=principal;const r=annualRate/1200;
    return Array.from({length:months},(_,i)=>{
      const interest=(method==='flat'?principal:balance)*r;
      const capital=method==='annuity'?Math.min(balance,pmt-interest):principal/months;
      const installment=capital+interest;balance=Math.max(0,balance-capital);
      return {month:i+1,principal:capital,interest,payment:installment,balance};
    });
  }
  function effectiveRate(net,payments){
    if(net<=0||!payments.length)return null;
    let low=0,high=1;
    const pv=r=>payments.reduce((s,p,i)=>s+p/Math.pow(1+r,i+1),0);
    if(pv(0)<net-0.01)return null;
    for(let i=0;i<100;i++){let m=(low+high)/2;if(pv(m)>net)low=m;else high=m;}
    return (Math.pow(1+(low+high)/2,12)-1)*100;
  }
  function rateFor(product,months){
    if(product.rateByTenor){const val=product.rateByTenor[months];if(val==null)return null;return val*12;}
    if(product.rateAnnual!=null)return product.rateAnnual;
    if(product.rateMonthly!=null)return product.rateMonthly*12;
    return null;
  }
  function cost(product,principal,months){
    const rate=rateFor(product,months),method=product.method;
    const rows=rate!=null&&method?schedule(principal,rate,months,method):[];
    const knownFee=(product.adminFee??0)+(product.provisionPct!=null?Math.max(principal*product.provisionPct/100,product.provisionMin??0):0)+(product.stampFee??0)+(product.disbursementFee??0)+principal*((product.adminPct??0)+(product.servicePct??0)+(product.processPct??0))/100;
    const knownFeeCount=['adminFee','provisionPct','stampFee','disbursementFee','adminPct','servicePct','processPct'].filter(k=>product[k]!=null).length;
    const deducted=product.feeTreatment==='deducted'?knownFee:0;
    const separate=product.feeTreatment==='separate'?knownFee:0;
    const total=rows.length?rows.reduce((s,r)=>s+r.payment,0):null;
    return {rate,method,rows,installment:rows[0]?.payment??null,lastInstallment:rows.at(-1)?.payment??null,total,interest:total===null?null:total-principal,knownFee,knownFeeCount,feeUnknown:!product.feesComplete,deducted,separate,net:product.feeTreatment==='unknown'?null:principal-deducted,knownTotal:total===null?null:total+knownFee+(product.monthlyFee??0)*months,effectiveAnnual:rows.length&&product.feesComplete&&product.feeTreatment!=='unknown'?effectiveRate(principal-deducted-separate,rows.map(x=>x.payment+(product.monthlyFee??0))):null};
  }
  function health(profile,shock={incomeDrop:0,costRise:0,extraDebt:0,reserveDraw:0}){
    const drop=clamp(Number(shock.incomeDrop)||0,0,100)/100,rise=(Number(shock.costRise)||0)/100;
    let incoming,expenses,beforeDebt;
    if(profile.category==='umkm'){
      incoming=profile.revenue*(1-drop);
      expenses=(profile.fixedCost+profile.variableCost*(1-drop))*(1+rise)+profile.ownerDraw;
      beforeDebt=incoming-expenses-profile.reserve;
    }else{
      incoming=profile.income*(1-drop);expenses=profile.expenses*(1+rise)+profile.other;
      beforeDebt=incoming-expenses-profile.reserve;
    }
    const debt=profile.debt+(Number(shock.extraDebt)||0);
    const available=beforeDebt-debt;
    // 35% is a planning choice, not an official underwriting rule.
    const ratioLimit=profile.category==='umkm'?Math.max(0,beforeDebt/1.25-debt):Math.max(0,incoming*0.35-debt);
    const capacity=Math.max(0,Math.min(available,ratioLimit,profile.maxInstallment));
    const reserveBalance=Math.max(0,profile.emergency-(Number(shock.reserveDraw)||0));
    return {incoming,expenses,beforeDebt,debt,available,capacity,ratio:incoming>0?debt/incoming:0,reserveBalance,runway:expenses+debt>0?reserveBalance/(expenses+debt):0,dscr:debt>0?beforeDebt/debt:null};
  }
  function match(product,profile){
    const c=cost(product,profile.amount,profile.tenor),h=health(profile),failed=[],unknown=[],passed=[];
    if(product.active===false)failed.push('Produk tidak menerima pengajuan baru.');
    if(product.category!==profile.category)failed.push('Kategori pembiayaan berbeda.');
    if(product.minAmount!=null&&profile.amount<product.minAmount)failed.push('Nominal di bawah plafon minimum.');
    if(product.maxAmount!=null&&profile.amount>product.maxAmount)failed.push('Nominal melebihi plafon maksimum.');
    if(product.minAmount==null||product.maxAmount==null)unknown.push('Batas plafon perlu konfirmasi.');
    const maxTenor=profile.purpose==='investasi'?(product.investmentMaxTenor??product.maxTenor):product.maxTenor;
    if((product.minTenor!=null&&profile.tenor<product.minTenor)||(maxTenor!=null&&profile.tenor>maxTenor)||(product.allowedTenors&&!product.allowedTenors.includes(profile.tenor)))failed.push('Tenor tidak tersedia untuk tujuan ini.');
    if(profile.category==='pribadi'&&product.minIncome!=null&&profile.income<product.minIncome)failed.push('Penghasilan di bawah minimum yang dipublikasikan.');
    if(profile.category==='umkm'&&product.minBusinessMonths!=null&&profile.businessMonths<product.minBusinessMonths)failed.push('Umur usaha belum memenuhi ketentuan.');
    if(product.requiresCollateral&&profile.collateral==='no')failed.push('Agunan tambahan diperlukan.');
    if(product.minAge&&profile.age<product.minAge)failed.push('Usia di bawah minimum yang dipublikasikan.');
    if(product.maxAgeAtMaturity&&profile.age+profile.tenor/12>product.maxAgeAtMaturity)failed.push('Usia saat lunas melampaui batas publikasi.');
    if(product.maxDebtRatio&&c.installment!=null&&(c.installment+profile.debt)>profile.income*product.maxDebtRatio)failed.push('Rasio angsuran melampaui ketentuan produk yang dipublikasikan.');
    if(product.requiresMembership&&!profile.bcaMember)unknown.push('Payroll atau kartu kredit BCA minimal 1 tahun perlu konfirmasi.');
    if(product.minTenor==null||maxTenor==null)unknown.push('Batas tenor belum lengkap; perlu konfirmasi.');
    if(c.installment===null)unknown.push('Bunga/metode belum cukup untuk menghitung cicilan.');
    else if(c.installment>h.capacity+0.01)failed.push('Estimasi cicilan melebihi kapasitas model.');
    else passed.push('Estimasi cicilan dalam kapasitas model.');
    if(!failed.some(x=>x.includes('plafon')))passed.push('Nominal berada dalam rentang publikasi.');
    if(!failed.some(x=>x.includes('Tenor')))passed.push('Tenor sesuai parameter yang tersedia.');
    if(!product.feesComplete)unknown.push('Sebagian biaya belum diketahui.');
    if(product.rateConditions)unknown.push(product.rateConditions);
    if(product.requiresPayroll&&profile.payroll!==product.bank)unknown.push('Payroll/keanggotaan bank perlu dikonfirmasi.');
    unknown.push('Dokumen, SLIK, dan persetujuan akhir diverifikasi bank.');
    const status=failed.length?'no':(c.installment===null||product.rateConditional||product.requiresPayroll||(product.requiresMembership&&!profile.bcaMember)||product.minAmount==null||product.maxAmount==null||product.minTenor==null||maxTenor==null||product.stale?'confirm':'fit');
    return {product,cost:c,health:h,status,failed,unknown,passed};
  }
  function alternative(product,profile){
    const h=health(profile),rate=rateFor(product,profile.tenor);
    if(rate==null||!product.method||h.capacity<=0)return null;
    const unit=payment(1,rate,profile.tenor,product.method);if(!unit)return null;
    let amount=Math.floor(Math.min(h.capacity/unit,product.maxAmount??Infinity,profile.amount)*0.95/100000)*100000;
    if(amount<(product.minAmount??0)||amount<=0)return null;
    const next={...profile,amount};const result=match(product,next);
    if(result.failed.length)return null;
    return {amount,installment:payment(amount,rate,profile.tenor,product.method),rate,tenor:profile.tenor,product};
  }
  function revenue(a){const reportRevenue=Math.max(0,Number(a.reports)||0)*Math.max(0,Number(a.price)||0),referralRevenue=Math.max(0,Number(a.referrals)||0)*Math.max(0,Number(a.commission)||0),boostRevenue=Math.max(0,Number(a.banks)||0)*Math.max(0,Number(a.boostMonthly)||0)*12,total=reportRevenue+referralRevenue+boostRevenue,operating=Math.max(0,Number(a.operating)||0),surplus=total-operating,price=Math.max(0,Number(a.price)||0),reportsToBreakEven=price>0?Math.max(0,Math.ceil((operating-referralRevenue-boostRevenue)/price)):null;return {reportRevenue,referralRevenue,boostRevenue,total,operating,surplus,reportsToBreakEven};}

  // Readiness model for an academic SCF-equity exploration prototype.
  // This is an internal checklist, not an OJK score or an issuer approval.
  function scfReadiness(input={}){
    const criteria=[
      {key:'legal',label:'Legalitas usaha',value:input.legal||'partial',points:{complete:20,partial:10,none:0},complete:'Dokumen legalitas usaha tersedia',partial:'Legalitas usaha masih perlu dilengkapi',none:'Legalitas usaha belum tersedia'},
      {key:'records',label:'Pencatatan keuangan',value:input.records||'partial',points:{monthly:20,basic:10,none:0},complete:'Pencatatan keuangan rutin tersedia',partial:'Pencatatan keuangan masih sederhana',none:'Pencatatan keuangan belum tersedia'},
      {key:'plan',label:'Rencana bisnis',value:input.plan||'partial',points:{yes:20,partial:10,no:0},complete:'Rencana bisnis dan penggunaan dana tersedia',partial:'Rencana bisnis perlu diperkuat',none:'Rencana bisnis belum tersedia'},
      {key:'equity',label:'Kesediaan berbagi kepemilikan',value:input.equity||'consider',points:{yes:20,consider:10,no:0},complete:'Pemilik bersedia mempertimbangkan dilusi saham',partial:'Pemilik masih mempertimbangkan dilusi saham',none:'Pemilik tidak bersedia berbagi kepemilikan'},
      {key:'disclosure',label:'Kesiapan keterbukaan informasi',value:input.disclosure||'partial',points:{yes:20,partial:10,no:0},complete:'Siap membuka informasi dan pelaporan usaha',partial:'Keterbukaan informasi perlu dipersiapkan',none:'Belum siap membuka informasi usaha'}
    ];
    const score=criteria.reduce((s,c)=>s+(c.points[c.value]??0),0);
    const equityCompatible=criteria.find(c=>c.key==='equity').value!=='no';
    const status=!equityCompatible?'notfit':score>=80&&criteria.every(c=>c.value==='yes'||c.value==='complete'||c.value==='monthly')?'ready':score>=50?'prepare':'notready';
    const missing=criteria.filter(c=>(c.points[c.value]??0)<20).map(c=>c.value==='no'||c.value==='none'?c.label+' belum tersedia':c.label+' perlu dilengkapi');
    return {score,status,equityCompatible,criteria,missing,label:status==='ready'?'Siap dieksplorasi':status==='prepare'?'Perlu persiapan':status==='notfit'?'Tidak cocok untuk SCF saham':'Belum siap'};
  }
  function equityDilution(preMoney,raiseAmount){
    if(!Number.isFinite(preMoney)||!Number.isFinite(raiseAmount)||preMoney<=0||raiseAmount<=0)return null;
    const postMoney=preMoney+raiseAmount;
    return {preMoney,raiseAmount,postMoney,investorPct:raiseAmount/postMoney*100,existingPct:preMoney/postMoney*100};
  }
  function fundingMatch(products,profile,readinessInput={}){
    if(profile.category!=='umkm')return {available:false,reason:'SCF ditujukan untuk penerbit/usaha yang memenuhi ketentuan, bukan pencarian kredit pribadi.',bank:{status:'na',candidates:[]},scf:{status:'na'}};
    const h=health(profile);
    const all=products.filter(p=>p.active&&p.category==='umkm').map(p=>match(p,profile));
    const bankCandidates=all.filter(m=>m.failed.length===0&&(m.cost.installment===null||m.cost.installment<=h.capacity+0.01));
    const bankFirm=bankCandidates.filter(m=>m.status==='fit');
    const bankStatus=bankFirm.length?'fit':bankCandidates.length?'confirm':'no';
    const scf=scfReadiness(readinessInput);
    let recommendation,detail,level;
    if(bankStatus==='fit'&&scf.status==='ready'){
      recommendation='Kedua jalur layak dievaluasi';
      detail='Kredit bank memiliki produk yang memenuhi parameter simulasi, sementara kesiapan awal SCF saham juga tinggi. Bandingkan konsekuensi angsuran dengan dilusi dan hak investor; tidak ada satu pilihan yang otomatis terbaik.';
      level='both';
    }else if(bankStatus==='fit'){
      recommendation='Kredit bank lebih sesuai untuk dievaluasi saat ini';
      detail='Ada produk bank yang memenuhi parameter dan estimasi kapasitas model. SCF saham masih memerlukan persiapan atau pemilik belum siap berbagi kepemilikan.';
      level='bank';
    }else if(scf.status==='ready'&&bankStatus==='confirm'){
      recommendation='SCF saham lebih siap dieksplorasi';
      detail='Checklist awal SCF saham tinggi, sedangkan produk bank yang relevan masih memerlukan konfirmasi tarif, syarat, atau informasi lain. Ini bukan keputusan pendanaan; konfirmasi bank dan penilaian penyelenggara tetap diperlukan.';
      level='scf';
    }else if(scf.status==='ready'){
      recommendation='SCF saham lebih siap dieksplorasi';
      detail='Checklist awal SCF saham tinggi dan belum ada produk bank yang dapat dinyatakan sesuai berdasarkan parameter saat ini. Pastikan kesiapan usaha serta ketentuan penyelenggara.';
      level='scf';
    }else if(bankStatus==='confirm'){
      recommendation='Kredit bank berpotensi sesuai, tetapi perlu konfirmasi';
      detail='Ada produk bank yang tidak gagal pada parameter dasar dan estimasi cicilannya tidak melebihi kapasitas model, tetapi tarif atau persyaratan perlu dikonfirmasi. SCF saham masih perlu persiapan.';
      level='bank-confirm';
    }else{
      recommendation='Belum ada jalur yang cukup sesuai';
      detail='Belum ada produk bank yang memenuhi parameter yang dapat diperiksa dan kesiapan SCF saham masih perlu ditingkatkan. Tinjau nominal, arus kas, dokumen, atau tunda keputusan pendanaan.';
      level='none';
    }
    return {available:true,health:h,bank:{status:bankStatus,candidates:bankCandidates,firm:bankFirm,all},scf,recommendation,detail,level};
  }

  const api={money,clamp,payment,schedule,effectiveRate,rateFor,cost,health,match,alternative,revenue,scfReadiness,equityDilution,fundingMatch};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.KKEngine=api;
})(typeof window!=='undefined'?window:globalThis);
