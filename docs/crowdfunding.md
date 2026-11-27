# ModalMatch — Smart Funding Match & CrowdFund Navigator

**Versi fitur:** 1.0  
**Tanggal penambahan:** 10 November 2026  
**Status:** prototipe akademik offline, seluruh profil dan simulasi SCF bersifat demonstrasi.

## 1. Tujuan pengembangan

Smart Funding Match memperluas ModalMatch dari pencarian dan pembandingan kredit bank menjadi alat bantu membandingkan dua jalur pendanaan bagi UMKM:

1. Kredit bank/Kredit Usaha Rakyat (KUR), yang menimbulkan kewajiban pembayaran sesuai kontrak.
2. Securities Crowdfunding (SCF) berbasis saham, yang memungkinkan usaha memperoleh modal melalui penawaran saham kepada investor dengan konsekuensi dilusi dan hak pemegang saham.

Aplikasi menggunakan profil UMKM yang sudah diisi pada menu Cari Pembiayaan. Pengguna tidak perlu memasukkan ulang omzet, biaya variabel, biaya tetap, penarikan pemilik, cicilan berjalan, cadangan, nominal kebutuhan, dan tenor.

## 2. Batas penting

- Fitur SCF hanya untuk profil usaha/UMKM. Pengguna profil pribadi diarahkan untuk beralih ke profil UMKM.
- Versi ini memodelkan **SCF saham (equity)** agar dampak dilusi dapat dihitung. SCF juga dapat menawarkan efek bersifat utang atau sukuk; keduanya tidak dimodelkan dalam kalkulator versi ini dan tidak boleh dianggap bebas kewajiban pembayaran.
- ModalMatch bukan penyelenggara SCF, penerbit efek, broker, bank, atau pengelola dana. Tidak ada penawaran efek nyata, investasi, pengumpulan dana, pembayaran, atau referral komersial aktif.
- Skor SCF adalah checklist internal untuk demonstrasi UX dan product logic. Bukan skor resmi OJK, penilaian penyelenggara, persetujuan, atau jaminan keberhasilan pendanaan.
- Status bank berasal dari mesin matching bank yang sudah ada. Data biaya bank masih memiliki keterbatasan; label hijau tidak menghapus kebutuhan konfirmasi bank.

## 3. Data yang dianalisis

### Data profil UMKM yang sudah tersedia
- Kebutuhan dana dan tujuan penggunaan.
- Tenor yang dipilih.
- Omzet bulanan.
- Biaya variabel.
- Biaya tetap.
- Penarikan pemilik.
- Cicilan berjalan.
- Cadangan bulanan dan saldo dana darurat.
- Umur usaha.
- Agunan dan usia pemohon bila relevan dengan produk bank.

### Checklist kesiapan SCF saham
Lima indikator diberi bobot maksimum 20 poin per indikator:

| Indikator | Pilihan | Poin |
|---|---|---:|
| Legalitas usaha | Lengkap / Sebagian / Belum tersedia | 20 / 10 / 0 |
| Pencatatan keuangan | Rutin / Sederhana / Belum tersedia | 20 / 10 / 0 |
| Rencana bisnis & penggunaan dana | Sudah / Perlu diperkuat / Belum | 20 / 10 / 0 |
| Kesediaan berbagi kepemilikan | Bersedia / Mempertimbangkan / Tidak bersedia | 20 / 10 / 0 |
| Keterbukaan informasi & pelaporan | Siap / Perlu persiapan / Belum siap | 20 / 10 / 0 |

Interpretasi:
- **80–100 dan semua indikator utama lengkap:** Siap dieksplorasi.
- **50–79, atau skor tinggi tetapi ada indikator belum lengkap:** Perlu persiapan.
- **Di bawah 50:** Belum siap.
- **Tidak bersedia berbagi kepemilikan:** Tidak cocok untuk SCF saham, tanpa memandang skor indikator lainnya.

Kriteria ini merupakan asumsi produk untuk menyusun percakapan dan checklist awal. Penyelenggara SCF dapat memiliki persyaratan, uji tuntas, dokumen, tata kelola, dan penilaian berbeda.

## 4. Mesin pencocokan dua jalur

### Jalur bank/KUR
Sistem memanggil hasil pencocokan produk bank yang sudah digunakan oleh Cari Pembiayaan:
- Memeriksa kategori, plafon, tenor, umur usaha, agunan, dan persyaratan yang diketahui.
- Menghitung cicilan jika metode dan tarif cukup.
- Membandingkan estimasi cicilan dengan kapasitas angsuran model.
- Menandai produk sebagai sesuai parameter, perlu konfirmasi, atau di luar parameter.

Status bank:
- Hijau jika setidaknya ada produk berstatus `fit` dari mesin bank.
- Kuning jika ada produk yang tidak gagal pada syarat dasar dan cicilan terhitung masih dalam kapasitas (atau tarif belum dapat dihitung sehingga perlu konfirmasi).
- Merah jika tidak ada produk yang lolos parameter.

### Jalur SCF saham
Sistem menilai lima indikator kesiapan di atas. Status hijau berarti checklist internal terpenuhi untuk dieksplorasi, bukan bahwa usaha telah diterima oleh penyelenggara.

### Kesimpulan gabungan
| Kondisi | Hasil yang ditampilkan |
|---|---|
| Bank fit + SCF ready | Kedua jalur layak dievaluasi |
| Bank fit + SCF belum siap | Kredit bank lebih sesuai untuk dievaluasi saat ini |
| Bank perlu konfirmasi + SCF ready | SCF saham lebih siap dieksplorasi; bank tetap alternatif setelah konfirmasi |
| Bank tidak sesuai + SCF ready | SCF saham lebih siap dieksplorasi |
| Bank perlu konfirmasi + SCF belum siap | Kredit bank berpotensi sesuai, tetapi perlu konfirmasi; SCF perlu persiapan |
| Bank tidak sesuai + SCF belum siap | Belum ada jalur yang cukup sesuai |

Sistem tidak memaksa satu pemenang jika bukti belum cukup. Alasan hasil selalu ditampilkan.

## 5. Arti warna

- **Hijau:** parameter/checklist internal terpenuhi untuk dieksplorasi.
- **Kuning:** ada syarat, biaya, dokumen, atau informasi yang belum lengkap dan perlu dikonfirmasi/dipersiapkan.
- **Merah:** tidak sesuai dengan parameter yang diketahui saat ini.

Warna adalah status analisis prototipe, bukan rating kredit, status izin, rekomendasi investasi, jaminan persetujuan, atau jaminan pendanaan.

## 6. Simulasi dilusi saham

Rumus sederhana:
- Valuasi post-money = valuasi pre-money + dana yang dihimpun.
- Persentase investor baru = dana yang dihimpun ÷ valuasi post-money × 100%.
- Persentase pemilik lama = valuasi pre-money ÷ valuasi post-money × 100%.

Contoh:
- Pre-money Rp450.000.000.
- Target dana Rp50.000.000.
- Post-money Rp500.000.000.
- Porsi investor baru 10%.
- Porsi pemilik lama 90%.

Ini hanya ilustrasi valuasi. Nilai sebenarnya bergantung pada penilaian usaha, harga dan jumlah saham, struktur penawaran, hak investor, biaya, dokumen, dan ketentuan yang berlaku. Tidak ada janji imbal hasil atau nilai exit.

## 7. Perbandingan karakter pendanaan

| Aspek | Kredit bank/KUR | SCF saham |
|---|---|---|
| Sumber dana | Bank | Investor melalui penyelenggara SCF |
| Kewajiban | Angsuran sesuai kontrak | Tidak ada cicilan pinjaman bulanan seperti kredit; hak investor mengikuti saham dan dokumen |
| Kepemilikan | Tidak terdilusi karena pinjaman | Terdilusi melalui penerbitan saham |
| Biaya/konsekuensi | Bunga/margin, provisi, administrasi, biaya lain | Dilusi, hak ekonomi/suara, biaya penawaran, keterbukaan dan tata kelola |
| Risiko utama | Tekanan arus kas dan gagal bayar | Dilusi, ekspektasi pemegang saham, keterbukaan informasi, risiko usaha dan likuiditas investasi |
| Penilaian | Bank menilai debitur dan agunan sesuai produk | Penyelenggara menilai penerbit/penawaran sesuai ketentuan |

Persentase bunga kredit dan persentase kepemilikan saham tidak dapat dibandingkan secara langsung sebagai biaya yang setara.

## 8. Pengalaman antarmuka

Menu **Alternatif Pendanaan** terdiri dari:
1. Ringkasan kebutuhan modal dan kapasitas kas.
2. Panel hasil Smart Funding Match.
3. Kartu Kredit Bank/KUR dengan daftar produk dan status.
4. Kartu SCF saham dengan skor kesiapan dan rincian indikator.
5. Form checklist kesiapan yang mengubah hasil secara dinamis.
6. Equity Dilution Simulator.
7. Tabel perbandingan bank vs SCF.
8. Tautan verifikasi penyelenggara melalui FIND OJK dan regulasi POJK 17/2025.

Menu dapat dibuka dari sidebar, home, hasil pencarian UMKM, atau mobile navigation.

## 9. Cara demonstrasi offline

1. Ekstrak ZIP, buka `index.html`.
2. Pilih menu Alternatif Pendanaan.
3. Jika profil masih pribadi, pilih Gunakan contoh profil UMKM.
4. Ubah checklist kesiapan. Amati warna, skor, dan kesimpulan berubah.
5. Pilih “Tidak bersedia berbagi kepemilikan”; status SCF saham berubah menjadi merah/tidak cocok.
6. Kembalikan ke “Bersedia mempertimbangkan saham”; lengkapi indikator lain sampai hijau.
7. Ubah pre-money dan target pendanaan; amati porsi investor dan pemilik lama.
8. Bandingkan konsekuensi bank dengan SCF.

Semua input, perhitungan, dan status berjalan secara lokal. Tautan OJK memerlukan internet.

## 10. Regulasi dan sumber

POJK Nomor 17 Tahun 2025 mengatur Penawaran Efek Melalui Layanan Urun Dana Berbasis Teknologi Informasi. OJK menjelaskan cakupan pengaturan termasuk perizinan dan kelembagaan penyelenggara, kewajiban/larangan, mekanisme penawaran efek, persyaratan penerbit dan pemodal, mitigasi risiko, tata kelola, dan pelindungan pengguna.

Sumber utama:
- OJK — POJK 17 Tahun 2025: https://ojk.go.id/id/regulasi/Pages/POJK-17-Tahun-2025-Penawaran-Efek-Melalui-Layanan-Urun-Dana-Berbasis-Teknologi-Informasi.aspx
- OJK FIND — Direktori Pelaku Sektor Jasa Keuangan: https://find.ojk.go.id/Home
- JDIH BPK — POJK 17 Tahun 2025: https://peraturan.bpk.go.id/Details/327332/peraturan-ojk-no-17-tahun-2025

Verifikasi status izin dan kanal resmi penyelenggara secara langsung sebelum mengarahkan pengguna. Daftar penyelenggara tidak di-hardcode pada prototipe ini karena statusnya harus selalu diperiksa pada sumber resmi terbaru.

## 11. Pekerjaan yang belum dilakukan

- Belum ada integrasi API atau kerja sama dengan penyelenggara SCF.
- Belum ada direktori kampanye/penawaran efek nyata.
- Belum ada simulasi efek utang dan sukuk.
- Belum ada penilaian legalitas/dokumen otomatis.
- Belum ada uji pengguna eksternal untuk memvalidasi bobot checklist.
- Belum ada pengujian browser visual end-to-end yang terverifikasi.

Pengembangan berikutnya harus dimulai dari validasi kebutuhan pengguna dan peninjauan hukum, bukan langsung memproses dana atau penawaran efek.
