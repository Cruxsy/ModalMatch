# ModalMatch — register bukti UMKM

Pemeriksaan: **7 November 2026**. Ini tanggal akses, bukan jaminan bahwa semua tarif berlaku hari ini. Angka bunga pada JSON menggunakan satuan persen: `6` berarti 6%, bukan 0,06. Nilai `null` berarti belum diketahui; bukan nol. `status: Verified` berarti sumber resmi diperiksa, bukan seluruh biaya sudah lengkap atau permohonan disetujui.

## Cakupan

10 produk/tier dari 5 bank: Mandiri Super Mikro, Mikro, Kecil; BNI Mikro dan Kecil; BRI Mikro, Kecil dan Kupedes; BCA KUR Kecil; BTN KUR. Tier bukan bank berbeda. Semua sumber resmi bank; aturan program juga diperiksa pada Kementerian Koordinator Bidang Perekonomian.

## Sumber dan keputusan data

| Sumber | Bukti / keputusan penting | Reference ID |
|---|---|---|
| [Mandiri KUR](https://www.bankmandiri.co.id/in/kredit-usaha-rakyat-kur) | Tabel membedakan plafon, agunan, sektor, frekuensi KUR, KMK dan investasi. Biaya diarahkan ke cabang. | turn1503185view1; turn2800800search1 |
| [BNI lending](https://www.bni.co.id/id-id/korporasi/perbankan-korporasi/lending) | Tier Mikro/Kecil, plafon dan tenor tersedia; masih ada konteks kebijakan 2022. | turn2915306search2; turn7359236search2 |
| [BNI RIPLAY Mikro](https://www.bni.co.id/Portals/1/BNI/Perusahaan/RIPLAY/Umum/RIPLAY-BNI-KUR-Mikro.pdf) | PDF versi 250305: tarif contoh; admin maksimum; asuransi bergantung profil. Isi terindeks resmi dapat dibaca; pengambilan PDF penuh gagal karena batas ukuran 13,8 MB. | turn2915306search4; turn2800800search7 |
| [BNI RIPLAY Kecil](https://www.bni.co.id/Portals/1/BNI/Perusahaan/RIPLAY/UMUM/RIPLAY-BNI-KUR-Kecil.pdf) | Keberadaan dokumen terverifikasi. Pengambilan penuh 14,7 MB gagal; rincian biaya tidak disimpulkan. | turn7359236search7; turn7683092view0 |
| [BRI program KUR 2026](https://bri.co.id/web/guest/promo-detail/900) | Sumber tanggal eksplisit 29 Jan–31 Des 2026 diprioritaskan untuk batas tier. | turn2915306view0; turn7359236search3 |
| [BRI KUR umum](https://bri.co.id/web/guest/kur) | Halaman mengandung plafon lama dan baru sekaligus. Tenor/biaya yang berasal dari sini diberi catatan konfirmasi. | turn1503185search2; turn2800800search0 |
| [BCA KUR](https://www.bca.co.id/id/bisnis/produk/pinjaman-bisnis/Kredit-Usaha-Rakyat) | KUR Kecil; tarif rentang, administrasi/provisi nol; biaya agunan/asuransi belum bernominal. | turn2915306view1; turn1503185search0 |
| [BTN KUR](https://www.btn.co.id/id/Business/Produk-Komersial/Kredit-Usaha-Mikro-Kecil-Menengah/KUR-Kredit-Usaha-Rakyat) | Maksimum tenor umum tanpa pemisahan tujuan. `maxTenor` KMK sengaja null, bukan 60. | turn2915306view2; turn7359236search4 |
| [BRI Kupedes](https://bri.co.id/web/guest/id/kupedes) | Produk riil, bunga dan tenor terkini tidak tersedia lengkap; angsuran bisa musiman. Jangan hitung cicilan otomatis. | turn3456935view1 |
| [Promo Kupedes September](https://bri.co.id/web/guest/en/promo-detail/2178) | Promo berakhir 30 Sep 2026. Angka bunga tanpa metode/periodisasi memadai tidak dipakai sebagai tarif sekarang. | turn3456935view0 |
| [Kemenko: pedoman KUR 2026](https://www.ekon.go.id/publikasi/detail/6784/konsolidasi-kredit-program-pemerintah-2026-perkuat-pedoman-pelaksanaan-kredit-program-optimalkan-penyaluran-dan-wujudkan-pertumbuhan-ekonomi-inklusif-berbasis-usaha-mikro-dan-kecil) | Memverifikasi konteks Permenko 1/2026 berlaku 13 Jan 2026; tarif sektor produksi/ekspor berbeda konteks dengan penerimaan berulang perdagangan non-ekspor. | turn1503185search4; turn2800800search5 |

## Kontrak integrasi mesin hitung

- `maxTenor` adalah maksimum **modal kerja**; `investmentMaxTenor` untuk investasi. Jika tidak diketahui, jangan menyatakan tenor pasti memenuhi.
- `minTenor:null` bukan berarti minimum nol. Ini perlu konfirmasi. BCA menyebut tidak ada minimum; model memakai satu bulan sebagai unit komputasi minimum.
- Batas tier eksklusif dinormalisasi dalam satuan rupiah: `10000001` berarti **lebih dari Rp10 juta** dan `100000001` berarti **lebih dari Rp100 juta**. Gunakan `amountText` saat menampilkan supaya tidak memberi kesan denominasi transaksi Rp1.
- `method:annuity` adalah **asumsi perhitungan prototipe**, bukan klaim bahwa seluruh bank menggunakan jadwal identik. Tampilkan `calculationNote`. BNI menyediakan satu contoh yang cocok dengan formula anuitas bulanan.
- Estimasi bunga efektif tahunan pada dataset menggunakan konvensi `r = rateAnnual / 100 / 12`. Pembulatan, hari aktual, tanggal pencairan dan tenor kalender bank dapat menghasilkan selisih.
- `rateAnnual:6` pada produk bertuliskan “mulai”/rentang berarti skenario dasar bersyarat, bukan jaminan. Tarif KUR berulang tidak boleh dipukul rata 6%.
- `adminFee:null, adminFeeMax:150000` pada BNI bukan biaya pasti 150.000. Tampilkan rentang/keterbatasan, atau izinkan asumsi pengguna yang diberi label.
- Semua `feesComplete:false`. Jumlah biaya diketahui bukan total biaya sebenarnya. `feeTreatment:unknown` tidak boleh otomatis dipotong dari pencairan ataupun dianggap dibayar terpisah.
- Kupedes harus muncul sebagai data belum cukup, bukan pinjaman bunga nol.
- Persyaratan dokumen hanya checklist; tidak mengumpulkan NIK, SLIK atau dokumen nyata. Syarat yang belum diinput tetap “belum diketahui/perlu verifikasi bank”.

## Angka kontrol independen

| Skenario | Cicilan anuitas model |
|---|---:|
| Rp100 juta, 6% p.a., 36 bulan | Rp3.042.194 / bulan |
| Rp50 juta, 6% p.a., 36 bulan | Rp1.521.097 / bulan |
| Rp10 juta, 3% p.a., 36 bulan | Rp290.812 / bulan |

Angka pertama sesuai contoh publik RIPLAY BNI Mikro. Angka kedua mengikuti linearitas pokok. Semua belum memasukkan biaya/asuransi yang tidak diketahui.
