# Product Requirements Document (PRD)
## Aplikasi E-Learning SMK Kautsar

* **Dokumen Versi:** 1.1 (Revisi Lengkap User Flow Siswa & Guru)
* **Status:** Draft / Ready for Development
* **Platform:** Mobile Web / Responsive Web App
* **Tanggal:** 21 Oktober 2026

---

## 1. Ringkasan Eksekutif (Executive Summary)
**E-Learning SMK Kautsar** adalah platform pembelajaran digital berbasis kejuruan yang dirancang untuk menjembatani interaksi antara **Siswa** dan **Guru**. Aplikasi ini memfasilitasi proses belajar-mengajar jarak jauh maupun mandiri dengan membagi akses menjadi dua peran utama (*Role*): Portal Siswa dan Portal Guru. Platform mencakup navigasi berbasis jurusan (TKJ, TKR, TBSM, Akuntansi), pengelolaan materi, pengumpulan tugas, koreksi nilai, hingga ekspor rekap nilai otomatis format Excel untuk kebutuhan *e-Rapor* sekolah.

---

## 2. Tujuan Produk (Product Goals)
* **Menyentralisasi Pembelajaran:** Menyediakan wadah terpusat untuk distribusi modul pembelajaran (PDF, Video) dan pengumpulan tugas praktik/teori siswa.
* **Efisiensi Kerja Guru:** Mempermudah guru dalam mempublikasikan materi, mengoreksi tugas, serta merekapitulasi nilai secara akurat.
* **Integrasi e-Rapor:** Menyediakan fitur ekspor data nilai yang kompatibel langsung dengan sistem *e-Rapor* sekolah (.xlsx).

---

## 3. Peran Pengguna (User Roles)

### 3.1 Siswa
* Melakukan login dengan NISN/ID Siswa.
* Mengakses materi & modul pembelajaran berdasarkan Jurusan dan Kelas.
* Mengunggah file tugas sesuai tenggat waktu (*deadline*).

### 3.2 Guru
* Melakukan login dengan ID Guru.
* Mengunggah materi dan membuat tugas baru per kelas/jurusan.
* Memeriksa file jawaban siswa dan memberikan nilai numeric (0-100).
* Mengakses tabel rekapitulasi nilai akhir dan mengunduh berkas `.xlsx` untuk e-Rapor.

---

## 4. Alur Pengguna LENGKAP (Detailed User Flow)

### 4.1 Sisi Siswa (Student Portal User Flow)
1. **Halaman Autentikasi / Login Siswa:**
   * Siswa membuka aplikasi dan memilih tab **SISWA**.
   * Memasukkan **NISN / ID Siswa** dan **Password**.
   * Menekan tombol **MASUK SEKARANG →**.
2. **Dashboard Utama Siswa:**
   * Setelah berhasil login, siswa disajikan 2 pilihan menu utama:
     * **MATA PELAJARAN:** Untuk mengakses modul, materi bacaan, dan video pembelajaran.
     * **KUMPUL TUGAS:** Untuk mengirimkan tugas sekolah yang diberikan guru.
3. **Pilihan Menu 1: MATA PELAJARAN (Modul & Materi)**
   * **Langkah 1 (Pilih Jurusan):** Siswa memilih jurusan yang sesuai: **TKJ** (Teknik Komputer), **TKR** (Teknik Kendaraan), **TBSM** (Sepeda Motor), atau **AKUN** (Akuntansi).
   * **Langkah 2 (Pilih Kelas):** Siswa memilih tingkatan kelas: **Kelas 10**, **Kelas 11**, atau **Kelas 12**.
   * **Langkah 3 (Halaman List Materi):**
     * Terdapat *Search Bar* (Pencarian materi/modul).
     * Daftar materi ditampilkan (contoh: Jaringan Dasar - Crimping UTP, Pemrograman Dasar - HTML/CSS).
     * Akses materi melalui opsi: **LIHAT MODUL**, **UNDUH PDF**, atau **TONTON VIDEO**.
4. **Pilihan Menu 2: KUMPUL TUGAS (Pengumpulan Tugas)**
   * **Langkah 1 (Pilih Jurusan):** Siswa memilih jurusan.
   * **Langkah 2 (Pilih Kelas):** Siswa memilih tingkatan kelas.
   * **Langkah 3 (Halaman Form Pengumpulan Tugas):**
     * Menampilkan nama tugas (contoh: *Tugas 1: Laporan Praktik Crimping UTP*), batas deadline, dan status (*Belum Dikirim*).
     * Area Upload: **Unggah File Tugas** (Drag-and-drop / klik area file: PDF, DOCX, ZIP maks 10MB).
     * Textbox opsional: **Catatan Tambahan**.
     * Menekan tombol **KIRIM TUGAS SEKARANG →**.

---

### 4.2 Sisi Guru (Teacher Portal User Flow)
1. **Halaman Autentikasi / Login Guru:**
   * Guru membuka aplikasi dan memilih tab **GURU**.
   * Memasukkan **ID Guru** dan **Password**, lalu klik **MASUK SEKARANG →**.
2. **Dashboard Utama Guru:**
   * Menampilkan 3 kartu pengelolaan utama:
     * **UNGGAH TUGAS & MATERI**
     * **KOREKSI TUGAS SISWA**
     * **EKSPOR NILAI E-RAPOR**
3. **Alur 1: Unggah Tugas & Materi**
   * Pilih Jurusan $\rightarrow$ Pilih Kelas $\rightarrow$ Form Input (Judul, Deskripsi Instruksi, Deadline, Unggah File Lampiran Max 25MB) $\rightarrow$ Klik **PUBLIKASIKAN TUGAS & MATERI →**.
4. **Alur 2: Koreksi Tugas Siswa**
   * Pilih Jurusan $\rightarrow$ Pilih Kelas $\rightarrow$ Daftar Kiriman Siswa (Nama, NIS, File Lampiran).
   * Guru klik **LIHAT JAWABAN**, mengisi **Input Nilai (0-100)**, lalu klik **SIMPAN NILAI**.
5. **Alur 3: Ekspor Nilai e-Rapor**
   * Pilih Jurusan $\rightarrow$ Pilih Kelas $\rightarrow$ Menampilkan **Tabel Rekap Nilai Akhir** (No, Nama Siswa, Nilai Tugas, Nilai Ujian, Nilai Akhir).
   * Klik tombol **UNDUH EXCEL E-RAPOR (.XLSX) →**.

---

## 5. Spesifikasi Antarmuka & Mapping Layar (Screen Hierarchy)

* `Frame 1`: Login Page (Tab Switcher: Siswa / Guru)
* `Frame 2A (Siswa)`: Dashboard Siswa (Pilihan: Mata Pelajaran vs Kumpul Tugas)
* `Frame 2B (Guru)`: Dashboard Guru (Pilihan: Unggah Tugas, Koreksi, Ekspor e-Rapor)
* `Frame 3`: Navigasi Pilih Jurusan (TKJ, TKR, TBSM, AKUN)
* `Frame 4`: Navigasi Pilih Kelas (Kelas 10, Kelas 11, Kelas 12)
* `Frame 5A (Siswa)`: Daftar Materi & Modul Pembelajaran (+ Search Bar)
* `Frame 5B (Siswa)`: Form Upload & Pengumpulan File Tugas Siswa
* `Frame 6A (Guru)`: Form Buat Tugas & Unggah Modul Guru
* `Frame 6B (Guru)`: Halaman Penilaian / Koreksi Hasil Tugas Siswa
* `Frame 6C (Guru)`: Halaman Rekap Tabel & Ekspor Nilai e-Rapor (.XLSX)

---

## 6. Kebutuhan Fungsional (Functional Requirements)

| ID Fitur | Modul | Deskripsi Kebutuhan | Prioritas |
| :--- | :--- | :--- | :--- |
| **AUTH-01** | Autentikasi | Login terpisah antara tab Siswa (NISN) dan Guru (ID Guru) dengan password. | Tinggi |
| **NAV-01** | Navigasi | Filter hierarkis: Jurusan $\rightarrow$ Kelas $\rightarrow$ Konten Materi / Tugas. | Tinggi |
| **MAT-01** | Modul Materi | *Search bar* interaktif untuk mencari modul/video berdasarkan nama materi. | Sedang |
| **TGS-01** | Pengumpulan | Siswa dapat memilih dan mengunggah file tugas (PDF, DOCX, ZIP maks 10MB). | Tinggi |
| **TGS-02** | Buat Tugas | Guru dapat membuat tugas baru, mengisi deskripsi, lampiran, dan batas tenggat waktu. | Tinggi |
| **CRS-01** | Koreksi Nilai | Guru dapat pratinjau berkas siswa, menginput nilai (0-100), dan menyimpan data. | Tinggi |
| **REP-01** | Rekap & Export | Tabel rekap nilai otomatis & tombol unduh file `.xlsx` untuk format e-Rapor. | Tinggi |

---

## 7. Kebutuhan Non-Fungsional (Non-Functional Requirements)

* **Responsivitas:** Tampilan dioptimalkan untuk perangkat seluler (*mobile-first design*).
* **Kompatibilitas File:** Mendukung format file `.pdf`, `.docx`, `.xlsx`, `.mp4`, dan `.zip`.
* **Kinerja:** Waktu pemuatan halaman di bawah 3 detik pada koneksi internet standar sekolah.
* **Keamanan Data:** Proteksi endpoint data nilai agar hanya dapat diakses dan diubah oleh akun Guru.