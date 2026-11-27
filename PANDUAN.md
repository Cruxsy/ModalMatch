# ModalMatch

Prototipe akademik pendukung keputusan pembiayaan Indonesia. Tagline: **One Platform, Multiple Financing Solutions**. ModalMatch bukan bank, pemberi dana, atau pemberi persetujuan kredit.

## Mulai menggunakan

Untuk paket offline: ekstrak seluruh ZIP, lalu buka **index.html** dengan Chrome, Edge, Firefox, atau Safari modern. Jangan membuka HTML langsung di dalam ZIP. Tidak perlu npm, server, API bank, atau internet untuk pencarian dan perhitungan. Saat pertama dibuka, pengguna dapat membuat akun demo, masuk, atau mencoba sebagai tamu. Semua berkas pendukung harus tetap berada dalam folder yang sama. Tautan bank dan Figma memerlukan internet. Akun demo disimpan secara lokal pada browser yang sama; kata sandi disimpan sebagai hash lokal. Akun bukan akun online, tidak tersinkron lintas perangkat, dan tidak boleh memakai kata sandi penting. Beberapa browser membatasi localStorage pada file lokal; bila demikian sesi tetap berjalan tetapi data tidak tersimpan.

Dalam paket offline ini, buka `index.html` langsung. Jika Node.js tersedia, jalankan `node tests.cjs` dari folder hasil ekstrak untuk mengulang pengujian.

**Catatan versi:** tautan Figma di bawah dan URL aplikasi privat dan file Figma merupakan referensi versi sebelumnya. Menu crowdfunding baru ditambahkan pada paket offline ZIP ini; file Figma belum diubah.

[Buka file desain Figma](https://www.figma.com/design/NMdVYJhGm6HOfScvuxj3Su). Buka halaman **03 · Application & Prototype**, pilih flow desain lama; flow Figma belum diperbarui untuk halaman masuk ModalMatch, lalu klik **Present / Play**. Tersedia flow UMKM dan monetisasi. Seluruh teks, komponen, warna, dan layout dapat diedit. Perhitungan Figma memakai state representatif; aplikasi HTML menjalankan input dan perhitungan sebenarnya.

## Yang tersedia

| Area | Fungsi yang diimplementasikan |
|---|---|
| Beranda | Ringkasan kapasitas dari profil aktif, pilihan kategori, produk, edukasi, contoh slot Boost berlabel simulasi |
| Cari pembiayaan | Form adaptif karyawan/UMKM, validasi, pencarian lokal, klasifikasi dan alasan hasil |
| Alternatif pendanaan | Smart Funding Match untuk membandingkan kredit bank/KUR dengan kesiapan Securities Crowdfunding (SCF) saham; hasil hijau/kuning/merah dan simulasi dilusi |
| Katalog | 19 produk aktif + 1 arsip; search, filter bank/kategori/nominal/tenor, sorting, detail, simpan |
| Bandingkan | 2–3 produk, satu nominal/tenor, angsuran, bunga, biaya diketahui, dana setelah potongan |
| Analisis | Arus kas, kapasitas model, stress test gaji/omzet/biaya/utang/cadangan, alternatif terhitung |
| SyaratCheck | Parameter input, syarat bank, dokumen/checklist lokal, status belum diketahui |
| Laporan | Preview, harga rencana Rp25.000 per laporan, checkout demo, berhasil/gagal, snapshot profil, cetak/PDF via browser, JSON |
| Referral | Kode teman, validasi kode checkout, rujukan bank demo, disclosure dan tautan resmi |
| Boost Produk Bank | Contoh slot promosi berbayar dengan label sponsor; belum mengklaim adanya mitra aktif dan tidak memengaruhi hasil pencocokan |
| Profil | Nama akun demo, favorit, riwayat, laporan, referral, keluar akun, dan penghapusan data lokal |
| Simulasi bisnis | Tepat tiga sumber, input dinamis, komposisi dan surplus/defisit hipotetis |
| Smart Funding Match | Mesin aturan yang menggabungkan hasil produk bank, kapasitas kas, checklist kesiapan SCF, rekomendasi penjelas, dan kalkulator dilusi saham |
| Sumber & bantuan | Register data, rumus, asumsi, riset pasar/kompetitor/regulasi, panduan demo |

KPR dan kendaraan ditandai roadmap. Login/pendaftaran hanya simulasi lokal pada browser, bukan autentikasi server. Tidak ada pengajuan kredit, akses SLIK, payment gateway, QRIS aktif, OTP, PIN, atau rekening pembayaran nyata. **Panel admin belum tersedia** pada paket ini; katalog produk masih berupa data lokal statis di `catalog.js`/`catalog.json` dan diperbarui dengan mengubah berkas tersebut. Panel admin yang aman memerlukan autentikasi admin, backend, dan pencatatan perubahan.


## Smart Funding Match — pengembangan crowdfunding

ModalMatch sekarang mempunyai menu **Alternatif pendanaan** untuk pengguna UMKM. Fitur ini membaca profil UMKM yang sama dengan Cari Pembiayaan, lalu membandingkan dua jalur: **kredit bank/KUR** dan **Securities Crowdfunding (SCF) saham**. Pengguna tidak perlu mengisi ulang nominal, tenor, omzet, biaya usaha, kewajiban, atau cadangan; nilai tersebut diambil dari profil UMKM aktif.

### Cara sistem memberi tanda warna

- **Hijau — Sesuai parameter / siap dieksplorasi:** produk bank memenuhi aturan yang dapat diuji, atau checklist internal kesiapan SCF mencapai kriteria prototipe. Hijau bukan persetujuan bank, bukan izin OJK, dan bukan jaminan penawaran SCF diterima.
- **Kuning — Perlu konfirmasi/persiapan:** tidak ada kegagalan pada parameter dasar, tetapi tarif/syarat produk bank masih perlu dikonfirmasi; atau dokumen/kesiapan SCF belum lengkap.
- **Merah — Belum sesuai:** tidak ada produk bank yang memenuhi parameter saat ini, atau pemilik tidak bersedia berbagi kepemilikan sehingga SCF saham tidak cocok.

Hasil akhir tidak selalu memaksa satu pemenang. Jika kedua jalur memenuhi parameter, sistem menampilkan bahwa keduanya layak dievaluasi. Jika satu jalur lebih siap, sistem menjelaskan alasannya. Jika keduanya belum cukup sesuai, sistem menyarankan persiapan atau peninjauan kebutuhan, bukan memaksakan pendanaan.

### Checklist SCF saham

Skor internal terdiri dari lima indikator berbobot 20 poin: legalitas usaha; pencatatan keuangan; rencana bisnis dan penggunaan dana; kesediaan berbagi kepemilikan; serta kesiapan keterbukaan informasi/pelaporan. Nilai lengkap = 20, sebagian = 10, belum tersedia = 0. Skor 80–100 dengan seluruh indikator utama lengkap diberi status “Siap dieksplorasi”; skor 50–79 “Perlu persiapan”; skor di bawah 50 “Belum siap”. Jika pemilik tidak bersedia berbagi kepemilikan, status SCF saham menjadi “Tidak cocok” meskipun skor indikator lain tinggi. Skor ini murni checklist produk akademik, bukan metodologi atau standar resmi OJK maupun penyelenggara SCF.

### Batas cakupan SCF

POJK 17 Tahun 2025 mengatur penawaran efek melalui layanan urun dana berbasis teknologi informasi. SCF dapat mencakup efek bersifat ekuitas berupa saham dan efek bersifat utang atau sukuk. Versi prototipe ini **hanya memodelkan SCF saham** agar dapat mendemonstrasikan dampak dilusi. Efek utang/sukuk belum dihitung dan tetap memiliki ketentuan pembayaran/imbalan sesuai dokumen penerbitan; karena itu jangan menganggap semua crowdfunding tidak memiliki kewajiban pembayaran.

ModalMatch bukan penyelenggara SCF, tidak mengumpulkan dana investor, tidak membuat penawaran efek, dan tidak menampilkan kampanye investasi nyata. Tautan FIND OJK dan POJK 17/2025 disediakan untuk verifikasi dan edukasi; status izin harus diperiksa ulang sebelum menggunakan layanan apa pun.

### Simulasi dilusi

Untuk ilustrasi penerbitan saham baru:
- Valuasi pre-money = Rp450.000.000.
- Target dana saham = Rp50.000.000.
- Valuasi post-money = Rp500.000.000.
- Porsi investor baru = Rp50 juta / Rp500 juta = 10%.
- Porsi pemilik lama = 90%.

Rumus ini merupakan ilustrasi sederhana. Struktur efek, harga penawaran, jumlah saham, hak investor, biaya, valuasi final, dan dokumen transaksi dapat mengubah hasil sebenarnya. Angka simulasi bukan penilaian valuasi usaha.

### Cara mencoba

1. Pilih menu **Alternatif pendanaan** di navigasi.
2. Jika profil masih pribadi, pilih **Gunakan contoh profil UMKM** atau ubah profil pada Cari Pembiayaan.
3. Buka checklist kesiapan SCF dan ubah jawaban; warna status dan rekomendasi akan berubah.
4. Bandingkan kartu Kredit Bank/KUR dan SCF saham. Produk bank menampilkan cicilan dan alasan perlu konfirmasi.
5. Ubah valuasi pre-money dan target dana untuk melihat porsi kepemilikan investor.
6. Buka tautan resmi OJK bila perlu memeriksa regulasi atau status penyelenggara.

**Penting:** status “Sesuai parameter” di ModalMatch hanya hasil aturan prototipe berdasarkan katalog dan data input. Keputusan kredit dibuat bank; kelayakan penerbit dan penawaran SCF diproses penyelenggara sesuai peraturan. Jangan gunakan hasil simulasi sebagai rekomendasi investasi atau keputusan pendanaan final.

Dokumentasi lebih lengkap: `docs/crowdfunding.md`.

## Integritas katalog

Data diperiksa **7 November 2026**. Paket disusun dan diuji 8 November 2026. Katalog berisi 20 entri dari 10 bank, termasuk 19 entri aktif dari 9 bank dan 1 arsip DBS. Beberapa entri UMKM merupakan tier KUR dari bank yang sama; jangan menyebutnya 19 bank atau 19 penawaran yang pasti tersedia.

Bank aktif: BCA, BNI, Mandiri, CIMB Niaga, OCBC, Danamon, PermataBank, BRI, BTN. Katalog JSON memuat plafon, tenor, bunga/metode, biaya diketahui, syarat, dokumen, agunan, URL, tanggal cek, dan catatan keterbatasan. Nama sumber bukan klaim kemitraan.

**Verified** berarti materi sumber resmi ditelusuri. Tidak berarti seluruh biaya diketahui atau berlaku universal. `null` berarti belum diketahui, bukan nol. Seluruh 20 entri mempunyai biaya/ketentuan yang belum lengkap. EIR final karena itu tidak ditampilkan. Dokumen Permata 2024 ditandai lama. DBS tidak menerima KTA baru efektif 1 Agustus 2026 dan dikeluarkan dari pencarian aktif. Biaya berbeda menurut kanal/segmen tidak dicampur sebagai tarif universal.

Katalog adalah kurasi, bukan seluruh pasar Indonesia. Sumber dapat berubah setelah pemeriksaan. OCBC dan sebagian dokumen diperiksa melalui indeks resmi ketika pengambilan halaman langsung dibatasi; catatan ini disimpan di audit sumber.

## Algoritma dan rumus

Satu mesin `engine.js` dipakai pada hasil, perbandingan, analisis, alternatif, dan laporan.

1. Hard filter: kategori, plafon, tenor menurut tujuan modal kerja/investasi, usia, pendapatan atau usia usaha, dan agunan yang diketahui.
2. Financial suitability: estimasi cicilan dibandingkan dengan kapasitas model. Bunga/biaya yang tidak tersedia tetap memiliki status konfirmasi.
3. Klasifikasi: sesuai parameter simulasi; berpotensi sesuai/perlu konfirmasi; di luar parameter. Tidak ada skor peluang persetujuan.
4. Ranking: relevansi, estimasi cicilan, atau biaya diketahui atas pilihan pengguna. Komisi dan sponsor tidak menjadi input ranking.

Flat: `A = P/n + P × rateMonthly/100`. Anuitas: `A = P×r/(1−(1+r)^−n)`, dengan `r = rateAnnual/1200`. Efektif pokok tetap: `A_t = P/n + saldo awal_t × r`. Untuk bunga nol: `P/n`.

Pokok, total angsuran, total bunga, biaya awal diketahui, potongan pencairan, biaya terpisah, dan biaya bulanan dicatat terpisah. Dana bersih ilustrasi hanya muncul bila perlakuan potong diketahui. Penghitungan EIR memakai pencarian IRR arus kas bulanan lalu `(1+r)^12−1`; hanya digunakan bila data biaya dan perlakuannya lengkap. Angka flat-indikatif CIMB, OCBC dan Danamon dipakai untuk ilustrasi pembayaran, bukan klaim amortisasi kontrak bank.

Pribadi: `kas = pendapatan − pengeluaran − cicilan lama − kewajiban lain − cadangan bulanan`. Kapasitas: `max(0, min(kas, 35% pendapatan − cicilan lama, batas pilihan))`. Rasio 35% adalah asumsi prototipe, bukan aturan resmi seluruh bank. Batas rasio khusus produk yang dipublikasikan diperiksa terpisah.

UMKM: `kas = omzet − biaya variabel − biaya tetap − penarikan pemilik − cicilan lama − cadangan`. Kapasitas: `max(0, min(kas, arus kas sebelum utang/1,25 − cicilan lama, batas pilihan))`. DSCR 1,25× adalah asumsi model. Pada stress test omzet, biaya variabel ikut berubah proporsional, biaya tetap tetap; kenaikan biaya operasional kemudian diterapkan. Saldo dana darurat tidak dihitung sebagai penghasilan bulanan.

Alternatif nominal dihitung dari kapasitas dibagi angsuran per Rp1, memakai penyangga 5%, dibulatkan turun Rp100.000, lalu diperiksa ulang terhadap batas produk. Jika tidak lolos, tidak ada angka alternatif yang dipaksakan.

## Dua demonstrasi utama

### Karyawan

1. Buka Cari Pembiayaan dan muat contoh karyawan. Kebutuhan Rp30 juta, 36 bulan, penghasilan bersih Rp6 juta, batas pilihan Rp1,5 juta.
2. Biaya Rp2,5 juta, kewajiban lain Rp200 ribu, cicilan lama Rp500 ribu, cadangan bulanan Rp500 ribu. Kas tersedia Rp2,3 juta; kapasitas model Rp1,5 juta.
3. Cari produk. BCA retail 36 bulan pada 1,07% flat menghasilkan Rp1.154.333,33/bulan, sesuai angka tabel bank setelah pembulatan.
4. Bandingkan BCA dan CIMB. Jangan menyimpulkan CIMB termurah karena rate minimum bersyarat dan biaya belum lengkap.
5. Analisis: turunkan gaji 30%. Kapasitas menjadi Rp500 ribu. Kekurangan kas setelah BCA sekitar Rp654.333/bulan. Alternatif model Rp12,3 juta menghasilkan sekitar Rp473.277/bulan.
6. Buka Laporan, masukkan referral MODALMATCH26, pilih metode demo. Coba gagal, ulangi, lalu berhasil. Laporan hanya tercatat setelah berhasil. Cetak atau simpan PDF melalui dialog browser.

### UMKM

1. Pilih UMKM. Modal Rp50 juta/36 bulan, omzet Rp40 juta, variabel Rp18 juta, tetap Rp8 juta, penarikan Rp4 juta, cicilan Rp1 juta, cadangan Rp3 juta.
2. Kas tersedia Rp6 juta, kapasitas pilihan Rp3,5 juta. KUR Mikro berskema ilustrasi 6% anuitas menghasilkan sekitar Rp1.521.097/bulan, tetap perlu konfirmasi tarif/syarat/biaya.
3. Turunkan omzet 20%. Omzet Rp32 juta; variabel Rp14,4 juta. Kas menjadi Rp1,6 juta dan kapasitas model Rp1,08 juta. Ini tidak sama dengan penurunan kas 20%.
4. Tinjau alternatif dan laporan. BRI Kupedes menunjukkan kondisi data bunga/tenor belum lengkap.
5. Gunakan Pusat Bantuan → Demo tanpa hasil: nominal Rp2 miliar dan batas Rp100 ribu. Semua produk kategori gagal batas dasar; aplikasi memberi penjelasan dan tidak memaksakan rekomendasi.

## Monetisasi dan privasi

Tepat tiga sumber pendapatan sesuai proposal: biaya laporan Rp25.000 per laporan; komisi referral diasumsikan Rp50.000 per rujukan yang berhasil dan memenuhi ketentuan mitra; serta Boost Produk Bank Rp500.000 per bank per bulan. Target mitra Boost adalah 1 bank pada tahun pertama, 3 bank pada tahun kedua, dan 5 bank pada tahun ketiga. Proyeksi dasar memakai 300/600/900 laporan dan 20/40/60 referral, sehingga pendapatan diperkirakan Rp14.500.000, Rp35.000.000, dan Rp55.500.000 per tahun. Seluruh angka merupakan asumsi, bukan pendapatan aktual atau kontrak yang telah disepakati. Modal awal pada proposal adalah Rp9.800.000. Anggaran iklan digital dan konten media sosial sebesar Rp500.000 diambil dari pos cadangan sehingga dana cadangan tersisa Rp400.000 dan total modal tidak berubah.

Profil dan aktivitas disimpan di localStorage. Kata sandi akun demo disimpan sebagai hash lokal, tetapi akun tidak memiliki autentikasi server dan data lokal tetap dapat diakses oleh pengguna browser yang sama. Gunakan persona fiktif dan jangan gunakan kata sandi penting. Hapus data melalui Profil. Penghapusan tidak menghapus file laporan yang sebelumnya diunduh oleh pengguna.

## Pengujian dan batas verifikasi

58/58 pengujian otomatis lulus: kontrol rumus independen, audit sumber/angka kosong, batas nominal/tenor, kapasitas, stress test, alternatif, perbandingan, status pembayaran, snapshot laporan, referral, validasi input, serta render seluruh view. Pengujian smoke test tambahan dilakukan di Chromium melalui harness HTML in-memory untuk halaman masuk, halaman utama, formulir pencarian, proyeksi pendapatan, semua view, dan viewport mobile 390 px. Tidak ditemukan error runtime atau horizontal overflow. Detail metode dan batasannya tersedia di `docs/qa-results.json` dan `docs/browser-qa.json`.

File Figma yang disebut pada bagian referensi merupakan desain versi sebelumnya dan tidak diperbarui dalam pekerjaan paket HTML ini. Figma sebelumnya berisi 33 layar pada 3 halaman; overlay tambahan belum dibuat. Untuk paket ModalMatch yang disertakan di ZIP ini, tampilan desktop dan mobile telah diperiksa melalui Chromium dengan aset dimuat dalam harness HTML in-memory. Pemeriksaan tersebut bukan pengujian hosted deployment atau uji lintas-browser penuh. Navigasi langsung ke file lokal/localhost dibatasi oleh lingkungan pengujian, sehingga metode, cakupan, dan keterbatasannya dicatat dalam `docs/browser-qa.json`.

## Struktur berkas

`index.html`, `styles.css`, `app.js`, `engine.js`, `catalog.js`, `catalog.json`, `assets/favicon.svg`: aplikasi offline. `research.html`: laporan riset dan sumber. `docs/`: audit sumber, riset, hasil pengujian, dokumentasi. `tests.cjs`: pengujian otomatis logika dan integrasi ringan langsung pada berkas aplikasi di folder ini.

## Pengembangan berikutnya

Validasi tugas dengan pengguna karyawan dan UMKM; minta RIPLAY personal untuk melengkapi biaya; tambahkan riwayat versi dataset dan pengujian lintas browser/perangkat; evaluasi aturan KUR per sektor/pengulangan; lakukan kajian perizinan, hak penggunaan data, kemitraan dan privasi sebelum komersialisasi; baru kemudian pertimbangkan integrasi bank/payment sungguhan. Tidak ada klaim prototipe akademik otomatis memenuhi ketentuan operasional.
