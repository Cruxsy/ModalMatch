# ModalMatch — audit sumber kredit pribadi

Pemeriksaan: **7 November 2026**. Data `personal.json` berisi **9 produk aktif dari 9 bank + 1 produk arsip DBS**. Angka suku bunga menggunakan **satuan persen**, bukan pecahan; `rateMonthly: 1.07` berarti 1,07%/bulan. Nilai `null` adalah belum diketahui, bukan nol. `Verified` berarti materi resmi ditelusuri, bukan seluruh parameter terkonfirmasi terkini atau pemohon pasti memenuhi syarat.

## Aturan integrasi yang perlu dipertahankan

- **BCA**: pilih `rateByTenor` berdasarkan tenor; jangan memakai rate 12 bulan untuk 36 bulan. Tarif payroll disediakan terpisah dan hanya berlaku untuk profil yang terkonfirmasi. Referensi uji independen di tabel bank: Rp30 juta/36 bulan retail = Rp1.154.333/bulan setelah pembulatan. Rumus lokal menghasilkan Rp1.154.333,33.
- **CIMB dan OCBC**: rate terendah adalah harga mulai, bukan tarif yang pasti diterima pengguna. Jika digunakan, hasil harus berbunyi “ilustrasi dengan bunga mulai …; perlu konfirmasi”. **Jangan menetapkan status sesuai final karena harga minimum saja.**
- **Danamon, CIMB, OCBC**: bank menyebut kontrak bunga efektif/annuity, sedangkan angka flat adalah indikasi angsuran. Model flat dapat mereplikasi indikasi pembayaran bulanan, tetapi jangan menyebut jadwal amortisasi pokok flat tersebut sebagai jadwal kontrak bank.
- **BNI, Mandiri, BRI, BTN**: `rateMonthly`/`rateAnnual` sengaja `null`. Tarif program, angka contoh, atau basis bunga tidak cukup untuk dijadikan satu tarif universal. Tampilkan “Perlu konfirmasi bank”.
- **Permata**: snapshot dokumen resmi tahun 2024, dengan penanda data lama. Tarif terkini tidak berhasil diambil. Jangan menghitung cicilan dari tarif lama; jangan menyebut semua tenor sampai 84 bulan tersedia untuk semua segmen.
- **DBS**: `active:false`; keluarkan dari seluruh pencarian pengajuan baru. Boleh muncul hanya pada arsip transparansi data.
- **Biaya**: tidak ada klaim seluruh biaya lengkap. Untuk Mandiri, dana ditahan satu angsuran bukan pendapatan/biaya bank; pisahkan dari biaya pembiayaan dan jelaskan sebagai kas diblokir.
- **CIMB**: plafon minimum belum dikonfirmasi terkini; 3–96 bulan pada hero mencakup keluarga program, sedangkan FAQ dana tunai 12–60 bulan. Dataset memakai 12–60 untuk dana tunai.
- **BRI**: plafon Rp500 juta berasal dari RIPLAY personal pegawai tetap; program/segmen lain dapat berbeda. Jangan mengklaim merupakan maksimum universal BRI.
- **BTN**: batas Rp100 juta adalah swasta; kelompok ASN/BUMN/BUMD/TNI/Polri dapat sampai Rp500 juta. Basis bunga dan tenor belum cukup jelas sehingga tidak dihitung.

## Register sumber dan bukti

| Produk | Sumber resmi yang diperiksa | ID referensi browsing | Status pemeriksaan |
|---|---|---|---|
| BCA Personal Loan | https://www.bca.co.id/id/Individu/produk/pinjaman/Pinjaman-Personal | `turn4596426view0`, `turn6284867view0` | Halaman penuh dan tabel bunga/biaya diperiksa |
| BNI Fleksi | https://bni.co.id/id-id/individu/pinjaman/bni-fleksi | `turn6020306view2` | Halaman penuh; tarif universal tidak tersedia |
| BNI eform — pembanding, tidak digabung | https://eform.bni.co.id/BNI_eForm/fdisc | `turn3581580search3` | Tabel penawaran berbeda dari produk umum; tidak diasumsikan berlaku universal |
| Mandiri KSM | https://www.bankmandiri.co.id/in/ksm | `turn4596426view1`, `turn6284867view3` | Halaman penuh; biaya regular dan Livin dibedakan; penahanan dana diidentifikasi |
| CIMB Xtra Dana | https://www.cimbniaga.co.id/id/personal/kta/xtra-dana | `turn6293632search1`, `turn4596426view2`, `turn6284867view5` | Tarif hingga 31 Desember 2026; kategori rate dan tenor tidak seragam |
| CIMB batas dana tunai | https://www.cimbniaga.co.id/id/inspirasi/perencanaan/butuh-pinjaman-dana-begini-syaratnya-agar-disetujui-bank | `turn4334366search1` | Sumber bank mendukung Rp300 juta/5 tahun |
| OCBC Cashloan | https://www.ocbc.id/id/individu/pinjaman/kredit-tanpa-agunan/cash-loan | `turn5829199search0`, `turn7498617search0` | Materi indeks resmi; fetch langsung 403; tabel dan biaya terindeks |
| OCBC tenor | https://www.ocbc.id/en/tentang-ocbc/informasi/siaran-pers/2024/06/26/ottodigital-x-ocbc | `turn7498617search6` | Rilis resmi mendukung tenor 6–36 bulan, konteks kerja sama 2024 |
| Danamon Dana Instant | https://www.danamon.co.id/id/Personal/Pinjaman/Dana-instant/Dana-Instant | `turn5829199search1` | Tabel ilustrasi resmi dan syarat terindeks; admin bergantung program |
| PermataKTA RIPLAY Juli 2024 | https://www.permatabank.com/sites/default/files/2024-07/RIPLAY%20Umum%20PermataKTA_Ver.07.2024_3.pdf | `turn5829199search4`, `turn4334366search7` | Dokumen resmi lama; diberi penanda |
| Permata tabel terkini | https://www.permatabank.com/id/article/tabel-suku-bunga-permatakta | `turn6020306view1` | Fetch 403; tidak dianggap terverifikasi terkini |
| BRI Multiguna Karya | https://www.bri.co.id/web/guest/id/brimultiguna-karya | `turn2566983view0` | Halaman penuh; rebranding dan payroll terkonfirmasi |
| BRI RIPLAY personal | https://bri.co.id/documents/20123/0/RIPLAY%2BPERSONAL%2BBRIGUNA%2BKARYA%2C%2BBRIGUNA%2BKARYA%2BPROFESI%2C%2BBRIGUNA%2BKARYA%2BSMART%2B%281%29.pdf/708fbe23-57ce-0702-0c17-d257d735c6d6?t=1740155313320 | `turn2566983view1` | PDF 3 halaman; plafon berbeda menurut tipe pegawai |
| KRING BTN | https://www.btn.co.id/id/individual/kredit-konsumer/produk-kredit/kring-btn | `turn4519359search4`, `turn2566983view3` | Halaman penuh; tarif bertahap tetapi basis/tenor belum cukup untuk kalkulasi |
| DBS KTA — penutupan pengajuan baru | https://www.dbs.id/digibank/id/id/pinjaman/produk-pinjaman/digibank-kta-instan | `turn6293632search2` | Pengumuman efektif 1 Agustus 2026; wajib arsip |

## Batasan

Ini katalog kurasi untuk prototipe, bukan pemindaian seluruh bank Indonesia. Pemeriksaan manual tidak membuktikan penawaran masih tersedia bagi setiap profil, wilayah, dan channel. Persetujuan, quote final, biaya lengkap, serta kelengkapan dokumen tetap dari bank. Tanggal pemeriksaan bukan tanggal berlakunya semua dokumen. Riwayat perubahan perlu diperbarui sebelum penggunaan komersial.
