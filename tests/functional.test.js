import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Smart Class Kautsar - Functional Test Suite', () => {
  let jsCode;
  let htmlTemplate;

  beforeEach(() => {
    // Read raw files
    htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    jsCode = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf-8');

    // Reset DOM
    document.documentElement.innerHTML = htmlTemplate;

    // Mock spy
    const exportSpy = vi.fn();
    window.__testExportSpy = exportSpy;

    // Execute main.js script with inline XLSX shim for JSDOM
    const script = document.createElement('script');
    script.textContent = `
      window.XLSX = {
        utils: {
          aoa_to_sheet: function() { return {}; },
          book_new: function() { return {}; },
          book_append_sheet: function() {}
        },
        writeFile: function(wb, name) {
          if (window.__testExportSpy) window.__testExportSpy(name);
        }
      };
      var XLSX = window.XLSX;
    \n` + jsCode;
    document.body.appendChild(script);

    // Trigger DOMContentLoaded
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  // =========================================================================
  // 1. ALUR AUTENTIKASI & ROLE SWITCHING
  // =========================================================================
  describe('1. Alur Autentikasi & Role Switching', () => {
    it('harus memulai aplikasi pada layar login dengan tab Siswa aktif secara default', () => {
      const loginView = document.getElementById('view-login');
      expect(loginView.classList.contains('active')).toBe(true);

      const tabSiswa = document.getElementById('tab-role-siswa');
      expect(tabSiswa.classList.contains('active')).toBe(true);

      const labelId = document.getElementById('label-identifier');
      expect(labelId.textContent).toContain('NISN');
    });

    it('harus berganti peran menjadi Guru saat tab Guru diklik', () => {
      const tabGuru = document.getElementById('tab-role-guru');
      const tabSiswa = document.getElementById('tab-role-siswa');
      const labelId = document.getElementById('label-identifier');
      const inputId = document.getElementById('input-identifier');

      tabGuru.click();

      expect(tabGuru.classList.contains('active')).toBe(true);
      expect(tabSiswa.classList.contains('active')).toBe(false);
      expect(labelId.textContent).toContain('NIP / ID Guru');
      expect(inputId.placeholder).toContain('guru01');
    });

    it('harus berhasil mengisi kredensial demo Siswa dan login ke Dashboard Siswa', () => {
      const btnDemoSiswa = document.getElementById('btn-demo-siswa');
      const formLogin = document.getElementById('form-login');

      // Klik demo siswa
      btnDemoSiswa.click();
      expect(document.getElementById('input-identifier').value).toBe('12345');
      expect(document.getElementById('input-password').value).toBe('siswa123');

      // Submit form
      formLogin.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Harus pindah ke dashboard siswa
      expect(document.getElementById('view-student-home').classList.contains('active')).toBe(true);
      expect(document.getElementById('student-name-display').textContent).toBe('Ahmad Fauzi');
      expect(document.getElementById('student-nisn-display').textContent).toBe('12345');
      expect(document.getElementById('user-role-badge').textContent).toContain('SISWA');
      expect(document.getElementById('btn-logout').style.display).not.toBe('none');
    });

    it('harus berhasil mengisi kredensial demo Guru dan login ke Dashboard Guru', () => {
      const btnDemoGuru = document.getElementById('btn-demo-guru');
      const formLogin = document.getElementById('form-login');

      // Klik demo guru
      btnDemoGuru.click();
      expect(document.getElementById('input-identifier').value).toBe('guru01');
      expect(document.getElementById('input-password').value).toBe('guru123');

      // Submit form
      formLogin.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Harus pindah ke dashboard guru
      expect(document.getElementById('view-teacher-home').classList.contains('active')).toBe(true);
      expect(document.getElementById('teacher-name-display').textContent).toContain('Hendra Gunawan');
      expect(document.getElementById('user-role-badge').textContent).toContain('GURU');
    });

    it('harus dapat logout dan membersihkan sesi ke layar login', () => {
      document.getElementById('btn-demo-siswa').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      const btnLogout = document.getElementById('btn-logout');
      btnLogout.click();

      expect(document.getElementById('view-login').classList.contains('active')).toBe(true);
      expect(document.getElementById('view-student-home').classList.contains('active')).toBe(false);
      expect(btnLogout.style.display).toBe('none');
    });
  });

  // =========================================================================
  // 2. ALUR PENJELAJAHAN MATERI & FILTERING (SISWA)
  // =========================================================================
  describe('2. Alur Penjelajahan Materi Pembelajaran (Siswa)', () => {
    beforeEach(() => {
      // Login sebagai Siswa
      document.getElementById('btn-demo-siswa').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

    it('harus mengarahkan Siswa ke Pilih Jurusan -> Pilih Kelas -> Daftar Materi', () => {
      // Klik kartu Mata Pelajaran
      document.getElementById('btn-nav-student-materi').click();
      expect(document.getElementById('view-pilih-jurusan').classList.contains('active')).toBe(true);

      // Pilih jurusan TKJ
      const tkjCard = document.querySelector('.department-card[data-jurusan="TKJ"]');
      tkjCard.click();
      expect(document.getElementById('view-pilih-kelas').classList.contains('active')).toBe(true);
      expect(document.getElementById('selected-jurusan-badge').textContent).toBe('TKJ');

      // Pilih Kelas 12
      const class12Card = document.querySelector('.class-card[data-kelas="12"]');
      class12Card.click();
      expect(document.getElementById('view-materi-list').classList.contains('active')).toBe(true);
      expect(document.getElementById('materi-context-heading').textContent).toContain('TKJ - Kelas 12');

      // Harus menampilkan kartu materi
      const materialCards = document.querySelectorAll('.material-card');
      expect(materialCards.length).toBeGreaterThan(0);
    });

    it('harus memfilter materi berdasarkan tab Kategori (PDF vs Video)', () => {
      document.getElementById('btn-nav-student-materi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      // Filter Video
      const videoTab = document.querySelector('.tablist-segmented .tab-item[data-filter="video"]');
      videoTab.click();

      const videoCards = document.querySelectorAll('.material-card');
      expect(videoCards.length).toBe(1);
      expect(document.querySelector('.material-type-tag').textContent).toContain('Video Tutorial');

      // Filter PDF
      const pdfTab = document.querySelector('.tablist-segmented .tab-item[data-filter="pdf"]');
      pdfTab.click();

      const pdfCards = document.querySelectorAll('.material-card');
      expect(pdfCards.length).toBe(3);
    });

    it('harus memfilter materi secara realtime berdasarkan input pencarian', () => {
      document.getElementById('btn-nav-student-materi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      const searchInput = document.getElementById('input-search-materi');
      const clearBtn = document.getElementById('btn-clear-search');

      // Cari kata kunci "Crimping"
      searchInput.value = 'Crimping';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));

      expect(clearBtn.style.display).not.toBe('none');
      const filteredCards = document.querySelectorAll('.material-card');
      expect(filteredCards.length).toBe(1);
      expect(filteredCards[0].textContent).toContain('Crimping');

      // Klik tombol clear
      clearBtn.click();
      expect(searchInput.value).toBe('');
      expect(clearBtn.style.display).toBe('none');
      expect(document.querySelectorAll('.material-card').length).toBe(4);
    });

    it('harus membuka modal video saat tombol Tonton Video diklik', () => {
      document.getElementById('btn-nav-student-materi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      const watchBtn = document.querySelector('.btn-watch-video');
      expect(watchBtn).not.toBeNull();
      watchBtn.click();

      const modalVideo = document.getElementById('modal-video');
      expect(modalVideo.style.display).toBe('flex');

      // Tutup modal
      document.getElementById('btn-close-video').click();
      expect(modalVideo.style.display).toBe('none');
    });

    it('harus dapat bernavigasi mundur menggunakan tombol Universal Back', () => {
      document.getElementById('btn-nav-student-materi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      const btnBack = document.getElementById('btn-back');
      expect(btnBack.style.display).not.toBe('none');

      // Klik Back pertama -> ke Pilih Kelas
      btnBack.click();
      expect(document.getElementById('view-pilih-kelas').classList.contains('active')).toBe(true);

      // Klik Back kedua -> ke Pilih Jurusan
      btnBack.click();
      expect(document.getElementById('view-pilih-jurusan').classList.contains('active')).toBe(true);

      // Klik Back ketiga -> ke Beranda Siswa
      btnBack.click();
      expect(document.getElementById('view-student-home').classList.contains('active')).toBe(true);
      expect(btnBack.style.display).toBe('none');
    });
  });

  // =========================================================================
  // 3. ALUR PENGUMPULAN TUGAS (SISWA)
  // =========================================================================
  describe('3. Alur Pengumpulan Tugas Praktik (Siswa)', () => {
    beforeEach(() => {
      document.getElementById('btn-demo-siswa').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

    it('harus membuka form kumpul tugas dan menampilkan preview berkas yang dipilih', () => {
      document.getElementById('btn-nav-student-tugas').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      expect(document.getElementById('view-kumpul-tugas').classList.contains('active')).toBe(true);

      // Simulasikan pemilihan file baru
      const fileInput = document.getElementById('file-input-tugas');
      const fakeFile = new File(['dummy content'], 'laporan_praktik_baru.pdf', { type: 'application/pdf' });
      Object.defineProperty(fileInput, 'files', { value: [fakeFile] });
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));

      // Verifikasi preview berkas muncul
      expect(document.getElementById('dropzone-prompt').style.display).toBe('none');
      expect(document.getElementById('file-preview-box').style.display).toBe('flex');
      expect(document.getElementById('preview-file-name').textContent).toBe('laporan_praktik_baru.pdf');

      // Reset file via tombol remove
      document.getElementById('btn-remove-file').click();
      expect(document.getElementById('dropzone-prompt').style.display).toBe('flex');
      expect(document.getElementById('file-preview-box').style.display).toBe('none');
    });

    it('harus menolak pengiriman formulir jika belum ada berkas yang dipilih', () => {
      document.getElementById('btn-nav-student-tugas').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      // Reset file jika ada
      document.getElementById('btn-remove-file').click();

      // Submit form kosong
      const form = document.getElementById('form-submit-task');
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Cek apakah ada toast error
      const toasts = document.querySelectorAll('.toast-error');
      expect(toasts.length).toBeGreaterThan(0);
      expect(toasts[toasts.length - 1].textContent).toContain('Harap pilih berkas');
    });
  });

  // =========================================================================
  // 4. ALUR KOREKSI TUGAS & PENILAIAN (GURU)
  // =========================================================================
  describe('4. Alur Koreksi & Penilaian Tugas Siswa (Guru)', () => {
    beforeEach(() => {
      document.getElementById('btn-demo-guru').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

    it('harus membuka daftar kiriman siswa dan memfilter berdasarkan status koreksi', () => {
      document.getElementById('btn-nav-guru-koreksi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      expect(document.getElementById('view-guru-koreksi').classList.contains('active')).toBe(true);

      // Filter Perlu Koreksi (belum ada nilai)
      const pendingTab = document.querySelector('[data-grade-filter="pending"]');
      pendingTab.click();

      let items = document.querySelectorAll('.submission-item-card');
      items.forEach(item => {
        expect(item.textContent).toContain('Belum Dinilai');
      });

      // Filter Sudah Dinilai
      const gradedTab = document.querySelector('[data-grade-filter="graded"]');
      gradedTab.click();

      items = document.querySelectorAll('.submission-item-card');
      items.forEach(item => {
        expect(item.textContent).toContain('Nilai:');
      });
    });

    it('harus membuka modal penilaian dan menyimpan nilai numerik (0-100)', () => {
      document.getElementById('btn-nav-guru-koreksi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      // Buka modal penilaian untuk siswa pertama
      const openGradeBtn = document.querySelector('.btn-open-grade');
      expect(openGradeBtn).not.toBeNull();
      openGradeBtn.click();

      const modalGrading = document.getElementById('modal-grading');
      expect(modalGrading.style.display).toBe('flex');

      // Masukkan nilai 95 dan feedback
      const inputNumeric = document.getElementById('input-grade-numeric');
      const inputFeedback = document.getElementById('input-grade-feedback');
      inputNumeric.value = '95';
      inputFeedback.value = 'Hasil pengujian sangat memuaskan!';

      // Simpan nilai
      const formGrade = document.getElementById('form-submit-grade');
      formGrade.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Modal harus tertutup dan nilai tersimpan
      expect(modalGrading.style.display).toBe('none');
      const toasts = document.querySelectorAll('.toast-success');
      const latestToast = toasts[toasts.length - 1];
      expect(latestToast).not.toBeUndefined();
      expect(latestToast.textContent).toContain('Nilai 95');
    });

    it('harus menolak nilai di luar rentang 0-100', () => {
      document.getElementById('btn-nav-guru-koreksi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      document.querySelector('.btn-open-grade').click();

      const inputNumeric = document.getElementById('input-grade-numeric');
      inputNumeric.value = '150'; // Nilai invalid (>100)

      const formGrade = document.getElementById('form-submit-grade');
      formGrade.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Modal tidak boleh tertutup dan menampilkan toast error
      expect(document.getElementById('modal-grading').style.display).toBe('flex');
      const toastError = document.querySelector('.toast-error');
      expect(toastError.textContent).toContain('angka di antara 0 hingga 100');
    });
  });

  // =========================================================================
  // 5. ALUR PUBLIKASI MATERI BARU (GURU)
  // =========================================================================
  describe('5. Alur Publikasi Materi / Tugas Baru (Guru)', () => {
    beforeEach(() => {
      document.getElementById('btn-demo-guru').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

    it('harus memvalidasi field wajib dan berhasil mempublikasikan tugas baru', () => {
      document.getElementById('btn-nav-guru-upload').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      expect(document.getElementById('view-guru-upload').classList.contains('active')).toBe(true);

      const titleInput = document.getElementById('guru-input-title');
      const descInput = document.getElementById('guru-input-desc');
      const form = document.getElementById('form-guru-new-task');

      // Coba submit kosong
      titleInput.value = '';
      descInput.value = '';
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      expect(document.getElementById('view-guru-upload').classList.contains('active')).toBe(true);

      // Isi lengkap
      titleInput.value = 'Tugas Praktik 3: Hotspot Server MikroTik';
      descInput.value = 'Konfigurasi user profile, walled garden, dan generate voucher.';
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Harus diarahkan kembali ke Dashboard Guru dengan toast sukses
      expect(document.getElementById('view-teacher-home').classList.contains('active')).toBe(true);
      const toasts = document.querySelectorAll('.toast-success');
      const latestToast = toasts[toasts.length - 1];
      expect(latestToast).not.toBeUndefined();
      expect(latestToast.textContent).toContain('berhasil dipublikasikan');
    });
  });

  // =========================================================================
  // 6. ALUR REKAP E-RAPOR & EKSPOR EXCEL (GURU)
  // =========================================================================
  describe('6. Alur Rekap e-Rapor & Ekspor Excel (Guru)', () => {
    beforeEach(() => {
      document.getElementById('btn-demo-guru').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });

    it('harus memfilter tabel rekap nilai saat mencari nama atau NISN siswa', () => {
      document.getElementById('btn-nav-guru-rekap').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      expect(document.getElementById('view-guru-rekap').classList.contains('active')).toBe(true);

      const searchInput = document.getElementById('input-search-rekap');
      searchInput.value = 'Citra';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));

      const rows = document.querySelectorAll('#table-rapor-body tr');
      expect(rows.length).toBe(1);
      expect(rows[0].textContent).toContain('Citra Dewi Lestari');
    });

    it('harus memicu ekspor Excel SheetJS tanpa error saat tombol unduh diklik', () => {
      document.getElementById('btn-nav-guru-rekap').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      const btnExport = document.getElementById('btn-export-excel');
      btnExport.click();

      // Cek apakah toast sukses ekspor muncul
      const toasts = document.querySelectorAll('.toast');
      const lastToast = toasts[toasts.length - 1];
      expect(lastToast.textContent).toContain('Berhasil mengunduh berkas e-Rapor');
      expect(lastToast.textContent).toContain('eRapor_TKJ_Kelas12_SMK_Kautsar.xlsx');
    });
  });

  // =========================================================================
  // 7. REGRESSION TEST: BREAK CONDITIONS & EDGE CASES
  // =========================================================================
  describe('7. Regression Tests: Titik Kerusakan Alur (Failure Modes)', () => {
    it('REG-01: Tidak boleh terjadi runtime crash jika kelas tidak memiliki materi', () => {
      document.getElementById('btn-demo-siswa').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      // Navigasi ke jurusan TKR Kelas 12 (tidak ada materi TKR 12 di DB mock)
      document.getElementById('btn-nav-student-materi').click();
      document.querySelector('.department-card[data-jurusan="TKR"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      // Container materi harus menampilkan empty state ramah tanpa error
      const container = document.getElementById('materials-container');
      expect(container.textContent).toContain('Belum ada materi');
      expect(document.getElementById('materi-count-badge').textContent).toBe('0 Modul');
    });

    it('REG-02: Tidak boleh crash jika pencarian materi menghasilkan 0 hasil', () => {
      document.getElementById('btn-demo-siswa').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      document.getElementById('btn-nav-student-materi').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      const searchInput = document.getElementById('input-search-materi');
      searchInput.value = 'nonexistentkeyword12345';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));

      const container = document.getElementById('materials-container');
      expect(container.textContent).toContain('Belum ada materi atau jobsheet yang sesuai');
    });

    it('REG-03: Tidak boleh crash saat pencarian tabel e-Rapor kosong', () => {
      document.getElementById('btn-demo-guru').click();
      document.getElementById('form-login').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

      document.getElementById('btn-nav-guru-rekap').click();
      document.querySelector('.department-card[data-jurusan="TKJ"]').click();
      document.querySelector('.class-card[data-kelas="12"]').click();

      const searchInput = document.getElementById('input-search-rekap');
      searchInput.value = 'siswa_yang_tidak_ada';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));

      const tbody = document.getElementById('table-rapor-body');
      expect(tbody.textContent).toContain('Tidak ada data siswa ditemukan');
    });
  });
});
