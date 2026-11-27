# ModalMatch — Riset pasar, produk, dan batas operasional

Tanggal pemeriksaan sumber: **7 November 2026**. Riset meja dari sumber primer; tidak ada wawancara atau survei pengguna ModalMatch yang dilakukan. Pemeriksaan halaman bukan jaminan seluruh materi telah diperbarui oleh penerbit. Angka bisnis di bagian akhir adalah asumsi demonstrasi.

## 1. Fakta pasar yang dapat ditelusuri

**SNLIK 2026 merupakan rilis terbaru yang ditemukan.** OJK, LPS, dan BPS melaporkan literasi keuangan nasional **69,57%** dan inklusi **93,61%**. Survei mencakup 75.000 responden usia 15–79 di 38 provinsi dan 514 kabupaten/kota; pengumpulan lapangan berlangsung 26 Januari–18 Februari 2026. Literasi mengukur pengetahuan, keterampilan, keyakinan, sikap, dan perilaku; inklusi mengukur penggunaan produk/layanan. Selisih dua indeks adalah **24,04 poin persentase**, tetapi bukan ukuran langsung jumlah orang yang salah memilih kredit atau tidak mampu membayar. [S1]

Perbandingan antarwaktu harus konsisten: rilis 2026 membandingkan dengan angka 2025 cakupan DNKI, **66,64% literasi** dan **92,74% inklusi**. SNLIK 2025 juga mempunyai metode keberlanjutan dengan hasil berbeda (66,46% dan 80,51%); jangan mencampurkannya sebagai tren yang sebanding. [S2]

OJK menyebut fungsi agregasi sebagai penghimpunan, penyaringan, dan/atau pembandingan informasi lintas lembaga, dengan tujuan membantu pemilihan sesuai profil atau kebutuhan. Ini mendukung relevansi masalah penemuan dan perbandingan produk; tidak membuktikan bahwa calon pengguna akan membayar ModalMatch. [S3]

**Contoh kompleksitas nyata:** BCA menerbitkan bunga Personal Loan retail berbeda menurut tenor, yakni 1,00%, 1,03%, dan 1,07% flat per bulan untuk 12, 24, dan 36 bulan. Halaman yang sama menjelaskan provisi, meterai, denda, dan biaya pelunasan dipercepat. Menampilkan satu angka “mulai dari” saja tidak cukup menggambarkan biaya pengguna. [S4]

Materi edukasi OJK membedakan flat yang dihitung dari pokok awal dengan efektif yang dihitung dari saldo tersisa. Implikasi desain ModalMatch: bandingkan arus kas/cicilan dan biaya yang diketahui, bukan mengurutkan nominal persentase dua metode secara langsung. [S5]

## 2. Peta kompetitor — observasi, bukan klaim ketiadaan fitur

| Layanan/sumber resmi | Fitur yang teramati | Posisi terhadap ModalMatch | Pelajaran desain |
|---|---|---|---|
| Cermati KTA [S6] | Input jumlah dan tenor; filter bank/jenis pinjaman; pengurutan cicilan; kartu produk dengan bunga, cicilan, detail, pengajuan | Pembanding lintas bank paling dekat pada alur penemuan | Buat input nominal/tenor ringkas dan tampilkan alasan hasil; jangan mengklaim pencarian multibank sebagai inovasi pertama |
| CekAja [S7] | Kategori KTA, kartu kredit, pinjaman online, kredit beragunan, serta konsultasi perencanaan/utang pada beranda | Pintu masuk multiproduk dan konsultasi | Fokuskan MVP pada pribadi dan UMKM supaya beban keputusan terjaga |
| BCA Personal Loan [S4] | Tarif dan biaya resmi, syarat, plafon, tabel cicilan menurut tenor | Sumber primer satu bank; bukan katalog seluruh pasar | Pertahankan tautan sumber serta rincian metode dan periode bunga |
| Kredit Pintar [S8] | Ketentuan menjelaskan penyelenggaraan LPBBTI dan proses permohonan; keputusan dapat diterima atau ditolak | Platform pendanaan dengan proses kredit; modelnya berbeda dari alat bantu perbandingan bank | Jelaskan ModalMatch bukan pemberi dana dan tidak memutus persetujuan |

Audit ini hanya menilai halaman publik yang dibaca; fitur di balik login, aplikasi, atau jalur lain belum diuji. Tidak ada kesimpulan bahwa kompetitor tidak mempunyai simulator risiko, transparansi biaya, atau layanan lain. Model pendapatan dan besaran komisi kompetitor tidak diverifikasi, sehingga tidak diisi dengan dugaan.

## 3. Hipotesis produk dan rekomendasi desain

**Hipotesis H1:** pengguna lebih mudah menilai pilihan jika cicilan, dana bersih, biaya diketahui, biaya belum diketahui, dan sumber ditempatkan berdekatan. Uji dengan tugas memilih dua tawaran dan menjelaskan selisih biayanya.

**Hipotesis H2:** pengguna akan memahami kapasitas bayar lebih baik melalui sisa kas setelah pengeluaran dan utang lama daripada hanya label “cocok”. Uji apakah mereka mampu mengenali skenario defisit setelah penurunan gaji.

**Hipotesis H3:** UMKM membutuhkan pemisahan omzet, biaya variabel, biaya tetap, kewajiban, dan cadangan. Omzet bukan kas bebas. Uji dengan satu skenario omzet turun sementara biaya tetap bertahan.

**Hipotesis H4:** alasan “perlu konfirmasi bank” yang spesifik akan lebih berguna daripada skor kecocokan yang tidak dijelaskan. Uji pemahaman persyaratan payroll, agunan, usia usaha, dan rate sesuai profil.

Rekomendasi: gunakan enam area pengalaman (Beranda, Cari Pembiayaan, Bandingkan, Analisis, Laporan, Profil), dengan maksimum lima item tab mobile dan fitur sekunder lewat menu. Pertahankan biaya penting dan peringatan risiko dalam layanan gratis. Tempatkan iklan di luar pengisian data keuangan. Premium menjual kedalaman laporan dan kemudahan ekspor.

**Diferensiasi yang realistis:** gabungkan katalog bersumber, status kelengkapan, kemampuan bayar, biaya, stress test, dan alternatif terhitung dalam satu alur offline. Ini adalah pilihan integrasi pengalaman, bukan klaim sebagai satu-satunya atau yang pertama.

## 4. Ringkasan regulasi untuk konteks produk

Ini adalah pemetaan isu dari sumber primer, bukan penetapan bahwa prototipe memenuhi persyaratan operasional.

| Rujukan | Fakta yang relevan | Implikasi pada prototipe |
|---|---|---|
| POJK 4/2025 PAJK [S9] | Pasal 2 mengatur prinsip agregasi transparan; Pasal 3 memuat cakupan dan pengecualian tertentu; Pasal 4 mengatur izin; Pasal 28 mensyaratkan kerja sama; Pasal 29 pengungkapan peran; Pasal 32 melarang, antara lain, penjelasan keliru dan penyalinan konten tanpa kerja sama dalam penyelenggaraan PAJK | Jangan mengaku PAJK berizin, bermitra, atau siap melayani komersial. Status akademik bukan dasar otomatis untuk menyimpulkan pengecualian. Kajian model final dan konsultasi regulator diperlukan sebelum komersialisasi |
| POJK 16/2025 [S10] | Mengatur penilaian kemampuan/kepatutan pihak utama; ketentuan penutup mencabut sejumlah pasal dan lampiran POJK 4/2025 | Jangan memakai naskah 4/2025 sebagai satu-satunya gambaran kewajiban terkini |
| POJK 30/2025 [S11] | Berlaku 1 Juli 2026; tata kelola dan manajemen risiko ITSK; mencabut sebagian ketentuan terkait dalam POJK 4/2025 | Operasional nyata memerlukan kesiapan tata kelola, manajemen risiko, dan sistem yang melampaui prototipe lokal |
| POJK 22/2023 [S12] | Pasal 32 menuntut informasi jelas, akurat, jujur, mudah diakses, tidak menyesatkan; Pasal 35 mengatur identitas dan pernyataan izin PUJK serta melarang pencantuman logo OJK pada pernyataan tersebut | Cantumkan asumsi, biaya belum diketahui, dan keputusan akhir bank; hindari lencana/logo yang menyiratkan ModalMatch berizin |
| PADK 37/PADK.08/2025 [S13] | Pedoman informasi, pemasaran, RIPLAY, kerja sama pihak ketiga, dan dokumentasi; berlaku 2 Desember 2025 serta mencabut SEOJK 12/2014 | Materi komersial dan referral nantinya perlu diperiksa berdasarkan pedoman terkini; demonstrasi iklan wajib jelas berlabel dan tidak menyamar sebagai rekomendasi |
| UU 27/2022 PDP [S14] | Mengatur hak subjek, pemrosesan, pengendali/prosesor, transfer, dan sanksi; data keuangan pribadi termasuk data pribadi spesifik | Gunakan persona fiktif; minimalkan data; jangan meminta NIK, PIN, OTP; jelaskan penyimpanan lokal dan sediakan penghapusan |

Referral demo hanya merekam status simulasi lokal dan membuka sumber/kanal resmi bank setelah pengguna membaca pengungkapan. Tidak ada pengajuan otomatis, pengiriman profil, komisi nyata, atau perjanjian bank yang dinyatakan aktif. Pembayaran demo tidak menggunakan QRIS aktif atau rekening tujuan riil.

## 5. Model bisnis — tepat tiga sumber, seluruhnya asumsi

| Sumber | Satuan asumsi | Pemicu perhitungan | Pengungkapan |
|---|---:|---|---|
| Biaya pembuatan laporan | Rp25.000/laporan | Jumlah laporan yang disimulasikan terjual | Harga rencana; checkout dan status transaksi demo |
| Kode referral | Rp50.000/rujukan memenuhi ketentuan | Rujukan berhasil sesuai ketentuan kerja sama hipotetis | Klik tautan bukan otomatis pendapatan; belum ada kemitraan |
| Boost Produk Bank | Rp500.000/bank/bulan | Jumlah mitra bank × biaya bulanan × 12 bulan | Target 1, 3, dan 5 bank; label sponsor; belum ada mitra aktif yang diklaim |

Contoh proyeksi hipotetis per bulan: 100 laporan menghasilkan Rp1.900.000; 20 rujukan memenuhi ketentuan menghasilkan Rp2.000.000; 50.000 impresi menghasilkan Rp500.000. Total Rp4.400.000. Bila biaya operasional masukan Rp3.000.000, surplus simulasi Rp1.400.000. Angka bukan pendapatan aktual, laba bersih audited, atau proyeksi yang tervalidasi. Pajak dan biaya lain belum tercakup kecuali dimasukkan ke biaya operasional.

Peringkat hasil tidak menggunakan referral fee maupun sponsor. Tidak ada B2B licensing, penjualan data, atau sumber pendapatan keempat.

## 6. Rencana validasi pengguna setelah prototipe

Rekrut secara terpisah karyawan dan pemilik UMKM untuk uji kualitatif. Tugas: mengisi profil, menemukan kredit, menjelaskan total biaya, mengenali data yang belum lengkap, membandingkan dua opsi, menjalankan penurunan pendapatan, dan menyelesaikan checkout demo. Catat keberhasilan tugas, salah tafsir, waktu, dan kebutuhan bantuan. Ini rencana penelitian; jangan menampilkan angka kepuasan, konversi, atau jumlah pengguna sebagai hasil yang sudah dikumpulkan.

Keberhasilan utama: keputusan yang dipahami, perhitungan konsisten, tidak ada rekomendasi dipaksakan saat kas negatif, dan pemisahan jelas antara data bank, asumsi model, dan monetisasi demo.

## Daftar sumber primer

- S1 — [OJK, LPS, BPS: Hasil SNLIK 2026](https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/Hasil-SNLIK-Tahun-2026.aspx), 11 Agustus 2026. Referensi riset: turn5076890view0 / turn3055347view0.
- S2 — [OJK dan BPS: Hasil SNLIK 2025](https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/OJK-dan-BPS-Umumkan-Hasil-Survei-Nasional-Literasi-Dan-Inklusi-Keuangan-SNLIK-Tahun-2025.aspx), 2 Mei 2025. Referensi: turn2667785search0.
- S3 — [OJK: Terbitkan Peraturan PAJK](https://www.ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/OJK-Terbitkan-Peraturan-Penyelenggara-Agregasi-Jasa-Keuangan.aspx), 13 Maret 2025. Referensi: turn2667785search4.
- S4 — [BCA: Personal Loan](https://www.bca.co.id/id/Individu/produk/pinjaman/Pinjaman-Personal). Referensi: turn3055347search0.
- S5 — [OJK: Buku 5 Lembaga Pembiayaan](https://sikapiuangmu.ojk.go.id/FrontEnd/images/FileDownload/205_Buku%205%20%20pembiayaan-ilovepdf-compressed.pdf). Referensi: turn3055347search7.
- S6 — [Cermati: Katalog KTA](https://www.cermati.com/kredit-tanpa-agunan/t/semua). Referensi: turn5076890search1.
- S7 — [CekAja: Beranda](https://cekaja.com/). Referensi: turn5076890search4.
- S8 — [Kredit Pintar: Persyaratan Layanan](https://www.kreditpintar.com/terms-of-service). Referensi: turn3055347search4.
- S9 — [OJK: POJK 4 Tahun 2025 PAJK](https://ojk.go.id/id/regulasi/Pages/POJK-4-2025-Penyelenggara-Agregasi-Jasa-Keuangan.aspx). Naskah PDF resmi: [Salinan](https://www.ojk.go.id/id/regulasi/Documents/Pages/POJK-4-2025-Penyelenggara-Agregasi-Jasa-Keuangan/Salinan%20POJK%20Nomor%204%20Tahun%202025.pdf). Referensi: turn2134582view0; turn8299466view2.
- S10 — [OJK: POJK 16 Tahun 2025](https://ojk.go.id/id/regulasi/Pages/POJK-16-Tahun-2025-Penilaian-Kemampuan-dan-Kepatutan-serta-Penilaian-Kembali-bagi-Pihak-Utama-di-Sektor-ITSK-AKD.aspx). Referensi: turn2401669search0. Catatan: metadata halaman dan uraian memiliki perbedaan tanggal; gunakan ketentuan penutup/naskah untuk tanggal efektif 1 Oktober 2025.
- S11 — [OJK: POJK 30 Tahun 2025](https://www.ojk.go.id/id/regulasi/Pages/POJK-Nomor-30-Tahun-2025-Penerapan-Tata-Kelola-dan-Manajemen-Risiko-Bagi-Penyelenggara-Inovasi-Teknologi-Sektor-Keuangan.aspx). Referensi: turn2134582search4.
- S12 — [OJK: POJK 22 Tahun 2023](https://ojk.go.id/id/regulasi/Pages/Pelindungan-Konsumen-dan-Masyarakat-di-Sektor-Jasa-Keuangan.aspx). [PDF resmi](https://www.ojk.go.id/id/regulasi/Documents/Pages/Pelindungan-Konsumen-dan-Masyarakat-di-Sektor-Jasa-Keuangan/POJK%2022%20Tahun%202023%20Pelindungan%20Konsumen%20dan%20Masyarakat%20di%20Sektor%20Jasa%20Keuangan.pdf). Referensi: turn8299466view0; turn8299466view1.
- S13 — [OJK: PADK 37/PADK.08/2025](https://ojk.go.id/id/regulasi/Pages/PADK-37-PADK08-2025-Penyediaan-Informasi-dan-Penyampaian-Informasi-untuk-Pemasaran-Produk-dan-Layanan-Jasa-Keuangan.aspx). Referensi: turn8299466search0.
- S14 — [JDIH BPK: UU 27 Tahun 2022 PDP](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022). Referensi: turn5076890search5.


## 8. Pengembangan produk — Smart Funding Match dan SCF

Atas masukan konsultasi dosen, ModalMatch diperluas dari pembanding kredit bank menjadi alat bantu membandingkan jalur pendanaan UMKM. Menu **Alternatif Pendanaan** memakai data profil UMKM yang sudah dimasukkan, kemudian memperlihatkan hasil dua jalur: kredit bank/KUR dan Securities Crowdfunding (SCF) saham.

**Pembedaan penting:** SCF bukan satu produk pinjaman. POJK 17 Tahun 2025 mengatur penawaran efek melalui layanan urun dana berbasis teknologi informasi. Dokumen OJK mencakup efek bersifat ekuitas berupa saham serta efek bersifat utang atau sukuk. Versi prototipe ini hanya memodelkan SCF saham karena ingin mendemonstrasikan dampak dilusi kepemilikan. Efek utang dan sukuk tidak dimodelkan; kewajiban dan perhitungan masing-masing instrumen berbeda. [S15]

### Mesin Smart Funding Match

- Jalur bank memanggil mesin matching yang sudah ada: hard filter plafon/tenor/syarat, estimasi cicilan, lalu perbandingan terhadap kapasitas kas.
- Jalur SCF saham menggunakan checklist internal lima indikator: legalitas, pencatatan keuangan, rencana bisnis/penggunaan dana, kesediaan berbagi kepemilikan, dan keterbukaan informasi. Bobot masing-masing 20 poin.
- Skor checklist bukan standar OJK, bukan skor kredit, bukan penilaian resmi penyelenggara, dan bukan jaminan penerimaan penerbit.
- Hasil gabungan tidak selalu memaksa satu pilihan. Jika dua jalur layak dievaluasi, keduanya ditampilkan. Jika data bank perlu konfirmasi, sistem menjelaskannya. Jika pemilik tidak bersedia berbagi kepemilikan, SCF saham dinyatakan tidak cocok; efek utang/sukuk belum menjadi bagian prototipe.

### Penanda warna

Hijau berarti parameter internal terpenuhi untuk dieksplorasi; kuning berarti butuh konfirmasi atau persiapan; merah berarti tidak sesuai dengan kriteria yang diketahui. Warna bukan persetujuan bank, izin OJK, rekomendasi investasi, atau jaminan dana terkumpul.

### Kalkulator dilusi

Simulasi pre-money Rp450 juta dan penghimpunan Rp50 juta menghasilkan post-money Rp500 juta; porsi investor baru 10% dan pemilik lama 90%. Ini contoh matematika sederhana, bukan penilaian valuasi atau term sheet.

### Batasan dan regulasi

ModalMatch tidak menjadi penyelenggara SCF, tidak menampilkan penawaran efek nyata, tidak mengumpulkan dana, dan tidak memproses investasi. Status penyelenggara harus diverifikasi melalui FIND OJK [S16] dan kanal resmi terkait. POJK 17/2025 merupakan rujukan utama untuk kerangka penawaran efek melalui layanan urun dana. [S15]

Tidak ada wawancara atau survei pengguna SCF yang dilakukan pada tahap penambahan ini. Bobot checklist dan aturan keputusan adalah asumsi desain yang perlu divalidasi kepada UMKM dan pihak yang memahami proses SCF.
