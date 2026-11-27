# Catatan perubahan ModalMatch

## Versi pembaruan — 27 November 2026

### Identitas dan tampilan
- Mengganti identitas aplikasi dari nama lama menjadi **ModalMatch** pada halaman utama, metadata, favicon, navigasi, dokumentasi, dan panduan.
- Menyelaraskan palet warna ke hijau-teal dengan latar netral dan kontras yang lebih tenang.
- Menambahkan layar awal dengan pilihan **Buat akun**, **Masuk**, dan **Coba sebagai tamu**.
- Menambahkan tampilan pendaftaran dan login dengan validasi nama, email, panjang kata sandi, dan konfirmasi kata sandi.
- Menyesuaikan header profil agar menampilkan nama pengguna.
- Memperjelas istilah navigasi, langkah pencarian, pusat bantuan, serta batasan prototipe.

### Akun dan privasi
- Akun demo disimpan secara lokal di browser yang sama; tidak ada server akun atau sinkronisasi lintas perangkat.
- Kata sandi akun demo di-hash menggunakan PBKDF2-HMAC-SHA-256 melalui Web Crypto API, dengan salt acak 16 byte dan 120.000 iterasi.
- Menambahkan mode tamu, keluar akun, dan penghapusan data lokal.
- Menjelaskan bahwa data browser dapat hilang jika penyimpanan browser dihapus; jangan memakai kata sandi penting.

### Model bisnis
- Harga rencana laporan: **Rp25.000 per laporan**.
- Komisi referral asumsi: **Rp50.000 per referral berhasil** yang memenuhi ketentuan mitra.
- Boost Produk Bank: **Rp500.000 per bank per bulan**, dengan target 1, 3, dan 5 bank pada tahun pertama hingga ketiga.
- Mengganti simulator pendapatan menjadi tepat tiga sumber pendapatan sesuai proposal.
- Menambahkan proyeksi pendapatan, biaya, laba sebelum pajak, dan BEP laporan per tahun.
- Memperjelas bahwa harga, komisi, mitra, checkout, dan pendapatan dalam aplikasi merupakan simulasi, bukan transaksi atau kerja sama aktual.

### Pengujian
- 58/58 tes otomatis logika dan integrasi ringan lulus.
- Pengujian visual dan alur utama dilakukan pada Chromium desktop dan viewport mobile 390 px melalui harness in-memory.
- Tidak ditemukan error runtime pada alur dan halaman yang diuji.
- Batasan metode pengujian dijelaskan dalam `docs/browser-qa.json`.
