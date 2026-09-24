# 📋 Form Pendataan Kebutuhan Sistem Klinik Terapi Anak

Formulir interaktif berbasis web (HTML + CSS + JavaScript) yang dirancang khusus untuk pengumpulan data kebutuhan sistem Klinik Terapi Anak. Tampilan disesuaikan dengan layar HP Android (Mobile-First responsive) dengan skema warna **Coral Red**, **Soft Grey**, **Pink Cyber**, dan **Hitam**.

---

## 🎨 Spesifikasi Tampilan & Fitur

1. **Tema Warna Cyber Coral**:
   - `Coral Red` (`#FF5A5F` / `#FF6F61`)
   - `Soft Grey` (`#E2E8F0` / `#94A3B8`)
   - `Pink Cyber` (`#FF2A85` - Neon Glow)
   - `Hitam Cyber` (`#0A0C10` / `#141720`)
2. **Desain Mobile-First (Android / iOS)**:
   - Chip pilihan radio & checkbox besar mudah ditap dengan jempol.
   - Smooth Multi-step Wizard 12 Langkah dengan indikator progress %.
   - Floating Step Navigator Pill di bagian atas.
   - Micro-animations & glassmorphism modern.
3. **Penyimpanan Draft Otomatis (Auto-Save)**:
   - Jika HP mati / browser ter-refresh, jawaban tersimpan otomatis di `localStorage`.
4. **Integrasi Google Sheets & Email (`kaishapuspito@gmail.com`)**:
   - Dilengkapi script `google-apps-script.js` untuk mencatat setiap respon ke Google Sheets dan mengirim notifikasi email otomatis dalam format tabel rapi.

---

## 🚀 Cara Menjalankan & Deploy

### A. Uji Coba Lokal
1. Buka file `index.html` langsung di browser HP atau Komputer (double click file `index.html` atau jalankan live server).

---

### B. Hubungkan ke Google Sheets & Email (`kaishapuspito@gmail.com`)

1. Buka [Google Sheets](https://sheets.google.com) dan buat spreadsheet baru.
2. Klik menu **Extensions (Ekstensi)** -> **Apps Script**.
3. Hapus semua kode default, lalu salin (copy) seluruh isi kode dari file `google-apps-script.js` ke dalam Apps Script.
4. Klik tombol **Deploy** di pojok kanan atas -> pilih **New deployment (Deployments Baru)**.
5. Klik ikon Roda Gigi (Select type) -> pilih **Web app**.
6. Atur konfigurasi berikut:
   - **Description**: `Klinik Survey Web App`
   - **Execute as**: `Me` (Email Anda)
   - **Who has access**: `Anyone` (Siapa saja - Wajib agar form bisa mengirim data)
7. Klik tombol **Deploy** dan berikan otorisasi izin akses Google.
8. Salin **Web App URL** yang dihasilkan (contoh: `https://script.google.com/macros/s/AKfycb.../exec`).
9. Tempelkan URL tersebut ke dalam aplikasi form:
   - Buka form di browser -> klik ikon **Gear (Pengaturan)** di kanan atas -> Paste URL -> Klik **Simpan URL**, atau
   - Buka file `app.js` dan ganti baris `let gasUrl = 'URL_ANDA_DI_SINI';`.

---

### C. Deploy Form ke Internet Gratis (Vercel / Netlify / GitHub Pages)

#### Pilihan 1: Vercel (Paling Cepat & Gratis)
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub / Email.
2. Drag & drop folder `klinik-terapi-form` ke Vercel dashboard.
3. Website langsung online dalam hitungan detik dengan domain gratis `.vercel.app`.

#### Pilihan 2: Netlify
1. Buka [netlify.com](https://netlify.com) dan login.
2. Drag & drop folder `klinik-terapi-form` ke area "Sites".
3. Dapatkan link live website gratis `.netlify.app`.

#### Pilihan 3: GitHub Pages
1. Push folder proyek ini ke repository GitHub Anda.
2. Buka Repository Settings -> Pages -> Source: `main` branch.
3. Form siap diakses publik di `https://username.github.io/klinik-terapi-form`.

---

## 📄 Ringkasan Pertanyaan Dalam Form (46 Pertanyaan)

- **Identitas Responden**: Nama Pengisi, Nama Klinik, Peran/Jabatan, WhatsApp/Email.
- **Seksi 1 (Q1-Q4)**: Data Pasien & Dokumen Medis
- **Seksi 2 (Q5-Q8)**: Assessment Anak & Laporan
- **Seksi 3 (Q9-Q12)**: Jenis Terapi & Pemantauan Target (IEP)
- **Seksi 4 (Q13-Q19)**: Terapis, Hak Akses & Penjadwalan
- **Seksi 5 (Q20-Q23)**: Rekam Terapi & Standar SOAP
- **Seksi 6 (Q24-Q28)**: Paket Terapi & Potong Kuota
- **Seksi 7 (Q29-Q34)**: Kasir, Transaksi & Metode Pembayaran
- **Seksi 8 (Q35-Q37)**: Laporan Management & Export
- **Seksi 9 (Q38-Q39)**: Notifikasi & Remind WhatsApp/Email
- **Seksi 10 (Q40)**: Dashboard Overview
- **Seksi 11-12 (Q41-Q46)**: Visual Branding, Perangkat, & Alur Pasien Lengkap
