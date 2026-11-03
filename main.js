/**
 * SMART CLASS KAUTSAR - APPLICATION LOGIC (main.js)
 * E-Learning SMK Kautsar Platform Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. MOCK DATABASE (VOCATIONAL SMK CURRICULUM)
  // =========================================================================

  const DB = {
    // Registered Users
    users: {
      siswa: [
        {
          id: '12345',
          nama: 'Ahmad Fauzi',
          role: 'siswa',
          jurusan: 'TKJ',
          kelas: '12',
          avatar: 'AF'
        },
        {
          id: '12346',
          nama: 'Budi Santoso',
          role: 'siswa',
          jurusan: 'TKJ',
          kelas: '12',
          avatar: 'BS'
        }
      ],
      guru: [
        {
          id: 'guru01',
          nama: 'Bpk. Hendra Gunawan, S.Kom',
          role: 'guru',
          jurusan: 'TKJ',
          kelas: '12',
          mapel: 'Administrasi Infrastruktur Jaringan',
          avatar: 'HG'
        }
      ]
    },

    // Materials per Jurusan & Kelas
    materials: [
      {
        id: 'mat-1',
        jurusan: 'TKJ',
        kelas: '12',
        title: 'Modul Praktik 1: Konfigurasi VLAN & Inter-VLAN Routing MikroTik',
        category: 'pdf',
        size: '3.8 MB',
        date: '21 Okt 2026',
        desc: 'Panduan step-by-step konfigurasi Virtual Local Area Network menggunakan Routerboard Mikrotik RB951.',
        fileUrl: '#download-vlan-pdf'
      },
      {
        id: 'mat-2',
        jurusan: 'TKJ',
        kelas: '12',
        title: 'Video Tutorial: Pengupasan & Splicing Kabel Fiber Optic Standar Telkom',
        category: 'video',
        size: '14 Menit',
        date: '22 Okt 2026',
        desc: 'Demonstrasi penggunaan Fusion Splicer, Miller Stripper, dan Optical Power Meter (OPM) berstandar industri.',
        videoTitle: 'Praktik Splicing FO Drop Cable',
        videoDesc: 'Pelajari batas redaman maksimal (-18 dBm s/d -24 dBm) serta keselamatan kerja saat memotong core kaca fiber.'
      },
      {
        id: 'mat-3',
        jurusan: 'TKJ',
        kelas: '12',
        title: 'Modul Teori: Keamanan Jaringan & Firewall Filtering Rules RouterOS',
        category: 'pdf',
        size: '2.1 MB',
        date: '19 Okt 2026',
        desc: 'Membahas filter rules input, forward, drop syn-flood attack, serta mitigasi port scanning.',
        fileUrl: '#download-firewall-pdf'
      },
      {
        id: 'mat-4',
        jurusan: 'TKJ',
        kelas: '12',
        title: 'Jobsheet: Crimping Kabel UTP Cat 6 & Sertifikasi Fluke Test',
        category: 'pdf',
        size: '4.5 MB',
        date: '15 Okt 2026',
        desc: 'Urutan warna T568A dan T568B, batas toleransi crosstalk, dan verifikasi throughput Gigabit.',
        fileUrl: '#download-crimping-pdf'
      },
      // TKR Materials
      {
        id: 'mat-5',
        jurusan: 'TKR',
        kelas: '11',
        title: 'Modul Tune-Up Sistem Injeksi Bensin EFI (Electronic Fuel Injection)',
        category: 'pdf',
        size: '5.2 MB',
        date: '20 Okt 2026',
        desc: 'Diagnosa sensor MAP, TPS, O2 sensor menggunakan OBD-II Engine Scanner.',
        fileUrl: '#download-tkr-efi'
      },
      // TBSM Materials
      {
        id: 'mat-6',
        jurusan: 'TBSM',
        kelas: '10',
        title: 'Video: Overhaul Karburator & Setting Celah Klep Motor Matik',
        category: 'video',
        size: '18 Menit',
        date: '18 Okt 2026',
        desc: 'Teknik pengukuran feeler gauge untuk klep in dan out motor matik 110cc-150cc.',
        videoTitle: 'Tune Up CVT & Valve Clearance TBSM',
        videoDesc: 'Panduan penyetelan celah katup motor berpendingin udara dan penggantian roller CVT.'
      },
      // AKUN Materials
      {
        id: 'mat-7',
        jurusan: 'AKUN',
        kelas: '12',
        title: 'Modul Komputer Akuntansi: Setup File Database MYOB & Accurate v5',
        category: 'pdf',
        size: '6.0 MB',
        date: '23 Okt 2026',
        desc: 'Langkah pembuatan bagan akun (Chart of Accounts), kartu piutang pelanggan, dan saldo awal neraca.',
        fileUrl: '#download-akun-myob'
      }
    ],

    // Assignments
    assignments: [
      {
        id: 'task-1',
        jurusan: 'TKJ',
        kelas: '12',
        title: 'Tugas 1: Laporan Praktik Crimping UTP & Pengujian LAN Tester',
        deadline: '26 Okt 2026, 23:59 WIB',
        desc: 'Kumpulkan laporan lengkap PDF mengenai proses perakitan kabel Straight & Cross, hasil pengujian, serta foto dokumentasi hasil kerja.',
        submissions: [
          {
            nisn: '12345',
            nama: 'Ahmad Fauzi',
            filename: 'laporan_crimping_ahmad_fauzi.pdf',
            size: '2.4 MB',
            submitDate: '24 Okt 2026, 10:15 WIB',
            notes: 'Pak, sudah saya tambahkan foto hasil tester semua pin 1-8 menyala hijau sempurna.',
            score: null,
            feedback: ''
          },
          {
            nisn: '12346',
            nama: 'Budi Santoso',
            filename: 'tugas1_budi_tkj12.pdf',
            size: '3.1 MB',
            submitDate: '23 Okt 2026, 14:20 WIB',
            notes: 'Tugas praktik sudah selesai.',
            score: 88,
            feedback: 'Bagus, urutan kabel sangat rapi dan isolator masuk ke dalam konektor RJ45.'
          },
          {
            nisn: '12347',
            nama: 'Citra Dewi Lestari',
            filename: 'citra_laporan_utp.docx',
            size: '1.8 MB',
            submitDate: '24 Okt 2026, 08:30 WIB',
            notes: 'Laporan praktikum crimping kabel LAN.',
            score: 92,
            feedback: 'Sangat detail dengan analisis redaman kabel.'
          },
          {
            nisn: '12348',
            nama: 'Dimas Bagaskara',
            filename: 'dimas_crimping.pdf',
            size: '4.2 MB',
            submitDate: '24 Okt 2026, 11:05 WIB',
            notes: 'Mohon koreksinya pak.',
            score: null,
            feedback: ''
          }
        ]
      },
      {
        id: 'task-2',
        jurusan: 'TKJ',
        kelas: '12',
        title: 'Tugas 2: Desain Topologi Jaringan Fiber Optic FTTX Kawasan Sekolah',
        deadline: '30 Okt 2026, 23:59 WIB',
        desc: 'Buat diagram topologi OLT, ODC, dan ODP menggunakan Cisco Packet Tracer atau Microsoft Visio.',
        submissions: []
      }
    ],

    // Grade Recap Table for e-Rapor
    grades: [
      { no: 1, nisn: '12345', nama: 'Ahmad Fauzi', tugas: 88, ujian: 85, akhir: 86.5, status: 'TUNTAS' },
      { no: 2, nisn: '12346', nama: 'Budi Santoso', tugas: 88, ujian: 80, akhir: 84.0, status: 'TUNTAS' },
      { no: 3, nisn: '12347', nama: 'Citra Dewi Lestari', tugas: 92, ujian: 94, akhir: 93.0, status: 'TUNTAS' },
      { no: 4, nisn: '12348', nama: 'Dimas Bagaskara', tugas: 78, ujian: 76, akhir: 77.0, status: 'TUNTAS' },
      { no: 5, nisn: '12349', nama: 'Eka Nurul Hidayah', tugas: 95, ujian: 96, akhir: 95.5, status: 'TUNTAS' },
      { no: 6, nisn: '12350', nama: 'Fajar Pratama', tugas: 70, ujian: 72, akhir: 71.0, status: 'REMEDIAL' },
      { no: 7, nisn: '12351', nama: 'Gilang Ramadhan', tugas: 82, ujian: 84, akhir: 83.0, status: 'TUNTAS' },
      { no: 8, nisn: '12352', nama: 'Hany Syahrani', tugas: 90, ujian: 88, akhir: 89.0, status: 'TUNTAS' },
      { no: 9, nisn: '12353', nama: 'Irfan Maulana', tugas: 68, ujian: 74, akhir: 71.0, status: 'REMEDIAL' },
      { no: 10, nisn: '12354', nama: 'Jovanka Alika', tugas: 86, ujian: 90, akhir: 88.0, status: 'TUNTAS' }
    ]
  };

  // =========================================================================
  // 2. STATE MANAGER
  // =========================================================================

  const state = {
    currentUser: null,           // Authenticated user object
    activeRole: 'siswa',         // 'siswa' | 'guru'
    currentScreen: 'view-login',
    screenHistory: [],
    selectedJurusan: 'TKJ',
    selectedKelas: '12',
    currentFlow: 'materi',       // 'materi' | 'tugas' | 'guru-upload' | 'guru-koreksi' | 'guru-rekap'
    selectedAssignmentId: 'task-1',
    activeGradingSubmission: null,
    selectedFileToUpload: null,
    materiFilter: 'all',
    materiSearchQuery: '',
    rekapSearchQuery: '',
    gradeFilter: 'all'
  };

  // =========================================================================
  // 3. ROUTING & SCREEN CONTROLLER
  // =========================================================================

  function navigateTo(screenId, addToHistory = true) {
    const prevScreen = state.currentScreen;
    if (addToHistory && prevScreen && prevScreen !== screenId && prevScreen !== 'view-login') {
      state.screenHistory.push(prevScreen);
    }

    // Toggle Screen Views
    document.querySelectorAll('.view-screen').forEach(scr => scr.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      state.currentScreen = screenId;
    }

    // Scroll main body to top
    const mainEl = document.getElementById('app-main');
    if (mainEl) mainEl.scrollTop = 0;

    // Update UI Header and Nav
    updateHeaderUI();
    updateBottomNavUI();

    // Render screen specific logic
    renderScreen(screenId);
  }

  function goBack() {
    if (state.screenHistory.length > 0) {
      const prev = state.screenHistory.pop();
      navigateTo(prev, false);
    } else {
      // Default fallback to home
      if (state.currentUser) {
        const homeScreen = state.currentUser.role === 'guru' ? 'view-teacher-home' : 'view-student-home';
        navigateTo(homeScreen, false);
      } else {
        navigateTo('view-login', false);
      }
    }
  }

  function updateHeaderUI() {
    const btnBack = document.getElementById('btn-back');
    const userRoleBadge = document.getElementById('user-role-badge');
    const rolePillText = document.getElementById('role-pill-text');
    const btnLogout = document.getElementById('btn-logout');

    if (!state.currentUser || state.currentScreen === 'view-login') {
      btnBack.style.display = 'none';
      userRoleBadge.style.display = 'none';
      btnLogout.style.display = 'none';
      return;
    }

    // Show Back button if not at Dashboard
    const isHome = (state.currentScreen === 'view-student-home' || state.currentScreen === 'view-teacher-home');
    btnBack.style.display = isHome ? 'none' : 'flex';
    btnLogout.style.display = 'flex';
    userRoleBadge.style.display = 'inline-flex';

    if (state.currentUser.role === 'guru') {
      userRoleBadge.className = 'role-pill teacher-badge';
      rolePillText.textContent = 'GURU';
    } else {
      userRoleBadge.className = 'role-pill student-badge';
      rolePillText.textContent = 'SISWA';
    }
  }

  function updateBottomNavUI() {
    const bottomNav = document.getElementById('app-bottom-nav');
    if (!state.currentUser || state.currentScreen === 'view-login') {
      bottomNav.style.display = 'none';
      return;
    }

    bottomNav.style.display = 'flex';
    const navTextAction = document.getElementById('nav-text-action');
    const navTextRekap = document.getElementById('nav-text-rekap');

    if (state.currentUser.role === 'guru') {
      navTextAction.textContent = 'Kelola';
      navTextRekap.textContent = 'e-Rapor';
    } else {
      navTextAction.textContent = 'Pelajaran';
      navTextRekap.textContent = 'Tugas';
    }

    // Highlight current bottom nav
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    if (state.currentScreen.includes('home')) {
      document.getElementById('nav-btn-home').classList.add('active');
    } else if (state.currentScreen.includes('materi') || state.currentScreen.includes('upload')) {
      document.getElementById('nav-btn-learning').classList.add('active');
    } else if (state.currentScreen.includes('rekap') || state.currentScreen.includes('tugas') || state.currentScreen.includes('koreksi')) {
      document.getElementById('nav-btn-rekap').classList.add('active');
    }
  }

  // =========================================================================
  // 4. SCREEN RENDERERS
  // =========================================================================

  function renderScreen(screenId) {
    switch (screenId) {
      case 'view-student-home':
        renderStudentHome();
        break;
      case 'view-teacher-home':
        renderTeacherHome();
        break;
      case 'view-pilih-jurusan':
        renderPilihJurusan();
        break;
      case 'view-pilih-kelas':
        renderPilihKelas();
        break;
      case 'view-materi-list':
        renderMateriList();
        break;
      case 'view-kumpul-tugas':
        renderKumpulTugas();
        break;
      case 'view-guru-upload':
        renderGuruUpload();
        break;
      case 'view-guru-koreksi':
        renderGuruKoreksi();
        break;
      case 'view-guru-rekap':
        renderGuruRekap();
        break;
    }
  }

  // --- Student Home ---
  function renderStudentHome() {
    if (!state.currentUser) return;
    document.getElementById('student-name-display').textContent = state.currentUser.nama;
    document.getElementById('student-nisn-display').textContent = state.currentUser.id;
    document.getElementById('student-jurusan-display').textContent = state.selectedJurusan;
    document.getElementById('student-kelas-display').textContent = `Kelas ${state.selectedKelas}`;
    document.getElementById('student-avatar-initial').textContent = state.currentUser.avatar || 'AF';

    // Upcoming tasks preview
    const previewContainer = document.getElementById('student-upcoming-tasks-list');
    const tasks = DB.assignments.filter(t => t.jurusan === state.selectedJurusan && t.kelas === state.selectedKelas);
    
    if (tasks.length === 0) {
      previewContainer.innerHTML = '<p class="text-muted" style="font-size: 12px;">Tidak ada tenggat tugas aktif.</p>';
      return;
    }

    previewContainer.innerHTML = tasks.map(task => {
      const mySub = task.submissions.find(s => s.nisn === state.currentUser.id);
      const isSubmitted = !!mySub;
      const badgeClass = isSubmitted ? 'status-submitted' : 'status-unsubmitted';
      const badgeText = isSubmitted ? 'Terkirim' : 'Belum Kirim';

      return `
        <div class="mini-task-item">
          <div>
            <div class="mini-task-title">${escapeHTML(task.title)}</div>
            <span style="font-size: 11px; color: var(--color-text-tertiary);"><i class="ri-time-line"></i> ${escapeHTML(task.deadline)}</span>
          </div>
          <span class="mini-task-badge ${badgeClass}">${badgeText}</span>
        </div>
      `;
    }).join('');
  }

  // --- Teacher Home ---
  function renderTeacherHome() {
    if (!state.currentUser) return;
    document.getElementById('teacher-name-display').textContent = state.currentUser.nama;
    document.getElementById('teacher-id-display').textContent = state.currentUser.id;

    // Quick Stats calculation
    let totalSubmissions = 0;
    let pendingGrading = 0;
    DB.assignments.forEach(task => {
      totalSubmissions += task.submissions.length;
      pendingGrading += task.submissions.filter(s => s.score === null).length;
    });

    document.getElementById('stat-total-submissions').textContent = totalSubmissions;
    document.getElementById('stat-pending-submissions').textContent = pendingGrading;

    // Calculate class average from DB.grades
    const avg = (DB.grades.reduce((acc, curr) => acc + curr.akhir, 0) / DB.grades.length).toFixed(1);
    document.getElementById('stat-class-average').textContent = avg;
  }

  // --- Pilih Jurusan Context Header ---
  function renderPilihJurusan() {
    const desc = document.getElementById('pilih-jurusan-context-desc');
    if (state.currentFlow === 'materi') {
      desc.textContent = 'Pilih jurusan untuk melihat modul & materi pembelajaran.';
    } else if (state.currentFlow === 'tugas') {
      desc.textContent = 'Pilih jurusan untuk mengumpulkan tugas praktikum.';
    } else if (state.currentFlow === 'guru-upload') {
      desc.textContent = 'Pilih jurusan sasaran materi / penugasan baru.';
    } else if (state.currentFlow === 'guru-koreksi') {
      desc.textContent = 'Pilih jurusan siswa yang ingin dikoreksi tugasnya.';
    } else if (state.currentFlow === 'guru-rekap') {
      desc.textContent = 'Pilih jurusan untuk rekapitulasi nilai e-Rapor.';
    }
  }

  // --- Pilih Kelas ---
  function renderPilihKelas() {
    document.getElementById('selected-jurusan-badge').textContent = state.selectedJurusan;
  }

  // --- Materials List (Siswa) ---
  function renderMateriList() {
    document.getElementById('materi-context-heading').textContent = `${state.selectedJurusan} - Kelas ${state.selectedKelas}`;
    
    // Filter materials
    let list = DB.materials.filter(m => m.jurusan === state.selectedJurusan && m.kelas === state.selectedKelas);

    // Filter by Tab (all, pdf, video)
    if (state.materiFilter !== 'all') {
      list = list.filter(m => m.category === state.materiFilter);
    }

    // Filter by Search Query
    if (state.materiSearchQuery.trim()) {
      const q = state.materiSearchQuery.toLowerCase();
      list = list.filter(m => m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));
    }

    document.getElementById('materi-count-badge').textContent = `${list.length} Modul`;
    const container = document.getElementById('materials-container');

    if (list.length === 0) {
      container.innerHTML = `
        <div class="surface-card" style="text-align: center; padding: 32px 16px;">
          <i class="ri-folder-open-line" style="font-size: 36px; color: var(--color-text-tertiary);"></i>
          <p style="margin-top: 8px; color: var(--color-text-secondary); font-size: 13px;">Belum ada materi atau jobsheet yang sesuai dengan filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => {
      const isVideo = item.category === 'video';
      const tagClass = isVideo ? 'tag-video' : 'tag-pdf';
      const tagText = isVideo ? 'Video Tutorial' : 'Modul PDF';
      const actionBtn = isVideo
        ? `<button type="button" class="btn btn-sm btn-primary btn-watch-video" data-id="${item.id}"><i class="ri-play-circle-line"></i> Tonton Video</button>`
        : `<button type="button" class="btn btn-sm btn-primary btn-download-pdf" data-id="${item.id}"><i class="ri-download-2-line"></i> Unduh Modul PDF</button>`;

      return `
        <div class="material-card">
          <div class="material-card-top">
            <span class="material-type-tag ${tagClass}">${tagText}</span>
            <div class="material-meta-row">
              <span><i class="ri-time-line"></i> ${item.date}</span>
              <span><i class="ri-hard-drive-line"></i> ${item.size}</span>
            </div>
          </div>
          <h4 class="material-title">${escapeHTML(item.title)}</h4>
          <p class="material-desc">${escapeHTML(item.desc)}</p>
          <div class="material-actions">
            ${actionBtn}
            <button type="button" class="btn btn-sm btn-outline btn-share-material" data-id="${item.id}">
              <i class="ri-share-forward-line"></i> Bagikan
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners to dynamic buttons
    container.querySelectorAll('.btn-watch-video').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = DB.materials.find(m => m.id === id);
        if (item) openVideoModal(item);
      });
    });

    container.querySelectorAll('.btn-download-pdf').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = DB.materials.find(m => m.id === id);
        showToast(`Memulai pengunduhan berkas: "${item.title}" (.pdf)...`, 'info');
      });
    });

    container.querySelectorAll('.btn-share-material').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Tautan modul berhasil disalin ke clipboard!', 'success');
      });
    });
  }

  // --- Kumpul Tugas (Siswa) ---
  function renderKumpulTugas() {
    const selector = document.getElementById('select-assignment-item');
    const tasks = DB.assignments.filter(t => t.jurusan === state.selectedJurusan && t.kelas === state.selectedKelas);

    if (tasks.length === 0) {
      document.getElementById('task-title-display').textContent = 'Tidak Ada Tugas Aktif';
      document.getElementById('task-desc-display').textContent = 'Belum ada tugas praktikum yang diberikan untuk tingkatan kelas ini.';
      return;
    }

    // Populate dropdown
    selector.innerHTML = tasks.map(t => `
      <option value="${t.id}" ${t.id === state.selectedAssignmentId ? 'selected' : ''}>${escapeHTML(t.title)}</option>
    `).join('');

    const currentTask = tasks.find(t => t.id === state.selectedAssignmentId) || tasks[0];
    state.selectedAssignmentId = currentTask.id;

    // Display Task Metadata
    document.getElementById('task-title-display').textContent = currentTask.title;
    document.getElementById('task-desc-display').textContent = currentTask.desc;
    document.getElementById('task-deadline-badge').innerHTML = `<i class="ri-time-line"></i> Batas: ${escapeHTML(currentTask.deadline)}`;

    // Check submission status for active student
    const studentId = state.currentUser ? state.currentUser.id : '12345';
    const mySub = currentTask.submissions.find(s => s.nisn === studentId);

    const statusPill = document.getElementById('task-status-pill');
    const submitBtn = document.getElementById('btn-send-task');
    const notesInput = document.getElementById('input-task-notes');

    if (mySub) {
      if (mySub.score !== null) {
        statusPill.className = 'status-badge status-graded';
        statusPill.textContent = `Sudah Dinilai: ${mySub.score}/100`;
      } else {
        statusPill.className = 'status-badge status-submitted';
        statusPill.textContent = 'Sudah Dikirim (Menunggu Koreksi)';
      }
      submitBtn.innerHTML = '<i class="ri-check-double-line"></i> <span>PERBARUI BERKAS TUGAS →</span>';
      notesInput.value = mySub.notes || '';
      
      // Show file preview
      showSelectedFilePreview({ name: mySub.filename, size: 2400000 });
    } else {
      statusPill.className = 'status-badge status-unsubmitted';
      statusPill.textContent = 'Belum Dikirim';
      submitBtn.innerHTML = '<i class="ri-send-plane-fill"></i> <span>KIRIM TUGAS SEKARANG →</span>';
      resetFileDropzone();
    }
  }

  // --- Guru Upload Form ---
  function renderGuruUpload() {
    document.getElementById('guru-upload-target-badge').textContent = `${state.selectedJurusan} - Kelas ${state.selectedKelas}`;
    // Set default deadline to +3 days from now
    const now = new Date();
    now.setDate(now.getDate() + 3);
    const deadlineInput = document.getElementById('guru-input-deadline');
    if (deadlineInput && !deadlineInput.value) {
      deadlineInput.value = now.toISOString().slice(0, 16);
    }
  }

  // --- Guru Koreksi ---
  function renderGuruKoreksi() {
    document.getElementById('grading-context-jurusan').textContent = `${state.selectedJurusan} - Kelas ${state.selectedKelas}`;
    const task = DB.assignments.find(t => t.id === state.selectedAssignmentId) || DB.assignments[0];
    
    document.getElementById('grading-assignment-title').textContent = task ? task.title : 'Penugasan Kejuruan';
    
    let submissions = task ? [...task.submissions] : [];

    // Filter by status tab (all, pending, graded)
    if (state.gradeFilter === 'pending') {
      submissions = submissions.filter(s => s.score === null);
    } else if (state.gradeFilter === 'graded') {
      submissions = submissions.filter(s => s.score !== null);
    }

    document.getElementById('grading-total-submissions').textContent = `Total: ${submissions.length} Siswa`;
    const container = document.getElementById('submissions-list-container');

    if (submissions.length === 0) {
      container.innerHTML = `
        <div class="surface-card" style="text-align: center; padding: 32px 16px;">
          <i class="ri-checkbox-circle-line" style="font-size: 36px; color: var(--color-accent-emerald);"></i>
          <p style="margin-top: 8px; color: var(--color-text-secondary); font-size: 13px;">Tidak ada kiriman tugas pada kategori filter ini.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = submissions.map(sub => {
      const isGraded = sub.score !== null;
      const statusPill = isGraded
        ? `<span class="status-badge status-graded"><i class="ri-check-line"></i> Nilai: ${sub.score}</span>`
        : `<span class="status-badge status-unsubmitted">Belum Dinilai</span>`;

      return `
        <div class="submission-item-card">
          <div class="submission-header-row">
            <div class="student-identity">
              <div class="avatar-sm">${sub.nama.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div class="student-meta-text">
                <strong>${escapeHTML(sub.nama)}</strong>
                <span>NISN: ${escapeHTML(sub.nisn)} &bull; ${escapeHTML(sub.submitDate)}</span>
              </div>
            </div>
            ${statusPill}
          </div>

          <div class="submission-detail-box">
            <span class="file-name"><i class="ri-file-pdf-fill"></i> ${escapeHTML(sub.filename)} (${sub.size})</span>
            <span style="font-size: 11px; color: var(--color-text-secondary);">${escapeHTML(sub.notes || '-')}</span>
          </div>

          <div class="submission-action-row">
            <div class="score-display">
              ${isGraded ? `Skor: <span class="numeric-score">${sub.score}</span> / 100` : '<span style="color: var(--color-text-tertiary); font-size: 12px;">Menunggu Penilaian</span>'}
            </div>
            <button type="button" class="btn btn-sm ${isGraded ? 'btn-outline' : 'btn-primary'} btn-open-grade" data-nisn="${sub.nisn}">
              <i class="ri-edit-2-line"></i> ${isGraded ? 'Koreksi Ulang' : 'Beri Nilai Sekarang'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners to grading buttons
    container.querySelectorAll('.btn-open-grade').forEach(btn => {
      btn.addEventListener('click', () => {
        const nisn = btn.getAttribute('data-nisn');
        const sub = task.submissions.find(s => s.nisn === nisn);
        if (sub) openGradingModal(sub);
      });
    });
  }

  // --- Guru Rekap e-Rapor ---
  function renderGuruRekap() {
    document.getElementById('rekap-heading-context').textContent = `${state.selectedJurusan} - Kelas ${state.selectedKelas}`;
    
    // Search filter
    let list = [...DB.grades];
    if (state.rekapSearchQuery.trim()) {
      const q = state.rekapSearchQuery.toLowerCase();
      list = list.filter(g => g.nama.toLowerCase().includes(q) || g.nisn.includes(q));
    }

    // Metrics calculations
    const total = DB.grades.length;
    const avg = (DB.grades.reduce((acc, c) => acc + c.akhir, 0) / total).toFixed(1);
    const passed = DB.grades.filter(c => c.akhir >= 75).length;
    const passRate = Math.round((passed / total) * 100);
    const highest = Math.max(...DB.grades.map(c => c.akhir));
    const highestStudent = DB.grades.find(c => c.akhir === highest);

    document.getElementById('metric-avg-score').textContent = avg;
    document.getElementById('metric-pass-rate').textContent = `${passRate}%`;
    document.getElementById('metric-pass-count').textContent = `${passed} dari ${total} Siswa`;
    document.getElementById('metric-highest-score').textContent = highest;
    document.getElementById('metric-highest-name').textContent = highestStudent ? highestStudent.nama : '-';

    // Populate Table
    const tbody = document.getElementById('table-rapor-body');
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">Tidak ada data siswa ditemukan.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((row, idx) => {
      const isPass = row.akhir >= 75;
      const statusBadge = isPass
        ? `<span class="status-pill-table" style="background:#dcfce7; color:#15803d;">Tuntas</span>`
        : `<span class="status-pill-table" style="background:#fee2e2; color:#b91c1c;">Remedial</span>`;

      return `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${escapeHTML(row.nisn)}</strong></td>
          <td>${escapeHTML(row.nama)}</td>
          <td>${row.tugas}</td>
          <td>${row.ujian}</td>
          <td><strong>${row.akhir}</strong></td>
          <td>${statusBadge}</td>
        </tr>
      `;
    }).join('');
  }

  // =========================================================================
  // 5. MODALS & DRAWERS (GRADING & VIDEO)
  // =========================================================================

  function openGradingModal(submission) {
    state.activeGradingSubmission = submission;
    document.getElementById('grading-modal-avatar').textContent = submission.nama.split(' ').map(n=>n[0]).slice(0,2).join('');
    document.getElementById('grading-modal-student-name').textContent = submission.nama;
    document.getElementById('grading-modal-student-nisn').textContent = `NISN: ${submission.nisn}`;
    document.getElementById('grading-modal-filename').textContent = submission.filename;
    document.getElementById('input-grade-numeric').value = submission.score !== null ? submission.score : '';
    document.getElementById('input-grade-feedback').value = submission.feedback || '';

    const modal = document.getElementById('modal-grading');
    modal.style.display = 'flex';
  }

  function closeGradingModal() {
    document.getElementById('modal-grading').style.display = 'none';
    state.activeGradingSubmission = null;
  }

  function openVideoModal(material) {
    document.getElementById('video-modal-title').innerHTML = `<i class="ri-film-line"></i> ${escapeHTML(material.title)}`;
    document.getElementById('video-mock-heading').textContent = material.videoTitle || material.title;
    document.getElementById('video-modal-desc').textContent = material.videoDesc || material.desc;

    const modal = document.getElementById('modal-video');
    modal.style.display = 'flex';
  }

  function closeVideoModal() {
    document.getElementById('modal-video').style.display = 'none';
  }

  // =========================================================================
  // 6. EXCEL E-RAPOR EXPORT (SHEETJS)
  // =========================================================================

  function exportRaporExcel() {
    try {
      showToast('Menyiapkan template e-Rapor dan memformat data...', 'info');

      // Prepare Excel rows matching standard e-Rapor SMK
      const excelData = [
        ['REKAPITULASI NILAI SISWA SMK TERPADU KAUTSAR'],
        ['PROGRAM KEAHLIAN:', state.selectedJurusan, 'TINGKAT KELAS:', `Kelas ${state.selectedKelas}`],
        ['MATA PELAJARAN:', 'Praktik Kejuruan Terpadu', 'TAHUN AJARAN:', '2026/2027 (Ganjil)'],
        ['KKM SEKOLAH:', 75],
        [], // empty row separator
        ['No', 'NISN', 'Nama Lengkap Siswa', 'Nilai Harian/Tugas', 'Nilai Ujian Praktik', 'Nilai Akhir', 'Predikat', 'Status Kelulusan']
      ];

      DB.grades.forEach((g, idx) => {
        let predikat = 'D';
        if (g.akhir >= 90) predikat = 'A';
        else if (g.akhir >= 80) predikat = 'B';
        else if (g.akhir >= 75) predikat = 'C';

        excelData.push([
          idx + 1,
          g.nisn,
          g.nama,
          g.tugas,
          g.ujian,
          g.akhir,
          predikat,
          g.akhir >= 75 ? 'TUNTAS' : 'REMEDIAL'
        ]);
      });

      // Add summary rows at bottom
      const total = DB.grades.length;
      const avg = (DB.grades.reduce((a, c) => a + c.akhir, 0) / total).toFixed(2);
      excelData.push([]);
      excelData.push(['Rata-Rata Kelas', '', '', '', '', avg, '', '']);
      excelData.push(['Tanggal Cetak:', new Date().toLocaleDateString('id-ID'), '', 'Wali Kelas / Guru Pengampu:', 'Bpk. Hendra Gunawan, S.Kom']);

      // Create sheet & workbook
      const ws = XLSX.utils.aoa_to_sheet(excelData);

      // Auto-fit column widths
      ws['!cols'] = [
        { wch: 6 },  // No
        { wch: 14 }, // NISN
        { wch: 28 }, // Nama
        { wch: 18 }, // Tugas
        { wch: 20 }, // Ujian
        { wch: 14 }, // Akhir
        { wch: 10 }, // Predikat
        { wch: 16 }  // Status
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `eRapor_${state.selectedJurusan}_${state.selectedKelas}`);

      // File name format
      const fileName = `eRapor_${state.selectedJurusan}_Kelas${state.selectedKelas}_SMK_Kautsar.xlsx`;
      XLSX.writeFile(wb, fileName);

      showToast(`Berhasil mengunduh berkas e-Rapor: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Gagal mengekspor berkas Excel. Pastikan library XLSX telah dimuat.', 'error');
    }
  }

  // =========================================================================
  // 7. FILE DROPZONE CONTROLLER
  // =========================================================================

  function showSelectedFilePreview(file) {
    state.selectedFileToUpload = file;
    document.getElementById('dropzone-prompt').style.display = 'none';
    const previewBox = document.getElementById('file-preview-box');
    previewBox.style.display = 'flex';
    document.getElementById('preview-file-name').textContent = file.name;
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    document.getElementById('preview-file-size').textContent = `${mb} MB`;
  }

  function resetFileDropzone() {
    state.selectedFileToUpload = null;
    document.getElementById('dropzone-prompt').style.display = 'flex';
    document.getElementById('file-preview-box').style.display = 'none';
    const input = document.getElementById('file-input-tugas');
    if (input) input.value = '';
  }

  // =========================================================================
  // 8. TOAST NOTIFICATION UTILITY
  // =========================================================================

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ri-information-line';
    if (type === 'success') icon = 'ri-checkbox-circle-fill';
    if (type === 'error') icon = 'ri-error-warning-fill';

    toast.innerHTML = `<i class="${icon}"></i> <span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // 9. EVENT LISTENERS SETUP
  // =========================================================================

  function initEventListeners() {
    // Universal Back Button
    document.getElementById('btn-back').addEventListener('click', goBack);

    // Universal Logout Button
    document.getElementById('btn-logout').addEventListener('click', () => {
      state.currentUser = null;
      state.screenHistory = [];
      showToast('Sesi Anda telah diakhiri. Sampai jumpa kembali!', 'info');
      navigateTo('view-login', false);
    });

    // --- Role Tab Switcher on Login Page ---
    const tabSiswa = document.getElementById('tab-role-siswa');
    const tabGuru = document.getElementById('tab-role-guru');
    const labelIdentifier = document.getElementById('label-identifier');
    const inputIdentifier = document.getElementById('input-identifier');

    tabSiswa.addEventListener('click', () => {
      tabSiswa.classList.add('active');
      tabGuru.classList.remove('active');
      state.activeRole = 'siswa';
      labelIdentifier.textContent = 'NISN / ID Siswa';
      inputIdentifier.placeholder = 'Contoh: 12345';
      inputIdentifier.value = '';
    });

    tabGuru.addEventListener('click', () => {
      tabGuru.classList.add('active');
      tabSiswa.classList.remove('active');
      state.activeRole = 'guru';
      labelIdentifier.textContent = 'NIP / ID Guru';
      inputIdentifier.placeholder = 'Contoh: guru01';
      inputIdentifier.value = '';
    });

    // Demo Autofill Buttons
    document.getElementById('btn-demo-siswa').addEventListener('click', () => {
      tabSiswa.click();
      inputIdentifier.value = '12345';
      document.getElementById('input-password').value = 'siswa123';
      showToast('Kredensial Siswa Demo (Ahmad Fauzi) diisi!', 'success');
    });

    document.getElementById('btn-demo-guru').addEventListener('click', () => {
      tabGuru.click();
      inputIdentifier.value = 'guru01';
      document.getElementById('input-password').value = 'guru123';
      showToast('Kredensial Guru Demo (Bpk. Hendra Gunawan) diisi!', 'success');
    });

    // Password visibility toggle
    document.getElementById('btn-toggle-pwd').addEventListener('click', () => {
      const pwdInput = document.getElementById('input-password');
      const icon = document.querySelector('#btn-toggle-pwd i');
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        icon.className = 'ri-eye-off-line';
      } else {
        pwdInput.type = 'password';
        icon.className = 'ri-eye-line';
      }
    });

    // Login Form Submit
    document.getElementById('form-login').addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = inputIdentifier.value.trim();
      const password = document.getElementById('input-password').value.trim();

      if (!identifier || !password) {
        showToast('Silakan lengkapi ID dan kata sandi Anda.', 'error');
        return;
      }

      // Check User
      const roleList = DB.users[state.activeRole];
      let user = roleList.find(u => u.id === identifier);

      // Allow automatic fallback for test ease
      if (!user) {
        user = {
          id: identifier,
          nama: state.activeRole === 'guru' ? 'Bpk. Pengajar Kautsar' : 'Siswa SMK Kautsar',
          role: state.activeRole,
          jurusan: 'TKJ',
          kelas: '12',
          avatar: state.activeRole === 'guru' ? 'GR' : 'SW'
        };
      }

      state.currentUser = user;
      state.selectedJurusan = user.jurusan || 'TKJ';
      state.selectedKelas = user.kelas || '12';

      showToast(`Selamat datang, ${user.nama}!`, 'success');

      if (user.role === 'guru') {
        navigateTo('view-teacher-home');
      } else {
        navigateTo('view-student-home');
      }
    });

    // --- Student Dashboard Cards Navigation ---
    document.getElementById('btn-nav-student-materi').addEventListener('click', () => {
      state.currentFlow = 'materi';
      navigateTo('view-pilih-jurusan');
    });

    document.getElementById('btn-nav-student-tugas').addEventListener('click', () => {
      state.currentFlow = 'tugas';
      navigateTo('view-pilih-jurusan');
    });

    // --- Teacher Dashboard Cards Navigation ---
    document.getElementById('btn-nav-guru-upload').addEventListener('click', () => {
      state.currentFlow = 'guru-upload';
      navigateTo('view-pilih-jurusan');
    });

    document.getElementById('btn-nav-guru-koreksi').addEventListener('click', () => {
      state.currentFlow = 'guru-koreksi';
      navigateTo('view-pilih-jurusan');
    });

    document.getElementById('btn-nav-guru-rekap').addEventListener('click', () => {
      state.currentFlow = 'guru-rekap';
      navigateTo('view-pilih-jurusan');
    });

    // --- Department Selection Cards ---
    document.querySelectorAll('.department-card').forEach(card => {
      card.addEventListener('click', () => {
        const j = card.getAttribute('data-jurusan');
        state.selectedJurusan = j;
        navigateTo('view-pilih-kelas');
      });
    });

    // --- Class Selection Cards ---
    document.querySelectorAll('.class-card').forEach(card => {
      card.addEventListener('click', () => {
        const k = card.getAttribute('data-kelas');
        state.selectedKelas = k;

        // Route to target based on currentFlow
        if (state.currentFlow === 'materi') {
          navigateTo('view-materi-list');
        } else if (state.currentFlow === 'tugas') {
          navigateTo('view-kumpul-tugas');
        } else if (state.currentFlow === 'guru-upload') {
          navigateTo('view-guru-upload');
        } else if (state.currentFlow === 'guru-koreksi') {
          navigateTo('view-guru-koreksi');
        } else if (state.currentFlow === 'guru-rekap') {
          navigateTo('view-guru-rekap');
        }
      });
    });

    // --- Material Filter Tabs ---
    document.querySelectorAll('.tablist-segmented .tab-item[data-filter]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tablist-segmented .tab-item[data-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.materiFilter = tab.getAttribute('data-filter');
        renderMateriList();
      });
    });

    // Search bar live filter for Materials
    const searchMateri = document.getElementById('input-search-materi');
    const clearSearch = document.getElementById('btn-clear-search');

    searchMateri.addEventListener('input', (e) => {
      state.materiSearchQuery = e.target.value;
      clearSearch.style.display = state.materiSearchQuery ? 'block' : 'none';
      renderMateriList();
    });

    clearSearch.addEventListener('click', () => {
      searchMateri.value = '';
      state.materiSearchQuery = '';
      clearSearch.style.display = 'none';
      renderMateriList();
    });

    // --- Kumpul Tugas Form & File Dropzone ---
    const dropzone = document.getElementById('dropzone-tugas');
    const fileInput = document.getElementById('file-input-tugas');

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        showSelectedFilePreview(e.target.files[0]);
      }
    });

    // Drag-and-drop support
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        showSelectedFilePreview(e.dataTransfer.files[0]);
      }
    });

    document.getElementById('btn-remove-file').addEventListener('click', (e) => {
      e.stopPropagation();
      resetFileDropzone();
    });

    // Assignment switcher in Kumpul Tugas
    document.getElementById('select-assignment-item').addEventListener('change', (e) => {
      state.selectedAssignmentId = e.target.value;
      renderKumpulTugas();
    });

    // Submit Task Handler
    document.getElementById('form-submit-task').addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.selectedFileToUpload) {
        showToast('Harap pilih berkas laporan tugas terlebih dahulu!', 'error');
        return;
      }

      const task = DB.assignments.find(t => t.id === state.selectedAssignmentId);
      if (!task) return;

      const studentId = state.currentUser ? state.currentUser.id : '12345';
      const studentName = state.currentUser ? state.currentUser.nama : 'Ahmad Fauzi';

      const existingIndex = task.submissions.findIndex(s => s.nisn === studentId);
      const newSubmission = {
        nisn: studentId,
        nama: studentName,
        filename: state.selectedFileToUpload.name,
        size: '2.4 MB',
        submitDate: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
        notes: document.getElementById('input-task-notes').value.trim(),
        score: null,
        feedback: ''
      };

      if (existingIndex >= 0) {
        task.submissions[existingIndex] = newSubmission;
        showToast('Berkas tugas Anda berhasil diperbarui!', 'success');
      } else {
        task.submissions.push(newSubmission);
        showToast('Tugas Anda berhasil dikirim ke guru pengampu!', 'success');
      }

      renderKumpulTugas();
    });

    // --- Teacher Upload New Task / Material ---
    document.getElementById('form-guru-new-task').addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('guru-input-type').value;
      const title = document.getElementById('guru-input-title').value.trim();
      const desc = document.getElementById('guru-input-desc').value.trim();
      const deadline = document.getElementById('guru-input-deadline').value;

      if (!title || !desc) {
        showToast('Judul dan petunjuk materi harus diisi lengkap!', 'error');
        return;
      }

      if (type === 'tugas') {
        const newTask = {
          id: `task-${Date.now()}`,
          jurusan: state.selectedJurusan,
          kelas: state.selectedKelas,
          title: title,
          deadline: deadline || '30 Okt 2026',
          desc: desc,
          submissions: []
        };
        DB.assignments.unshift(newTask);
        showToast(`Tugas baru "${title}" berhasil dipublikasikan ke siswa!`, 'success');
        navigateTo('view-teacher-home');
      } else {
        const newMaterial = {
          id: `mat-${Date.now()}`,
          jurusan: state.selectedJurusan,
          kelas: state.selectedKelas,
          title: title,
          category: type === 'video' ? 'video' : 'pdf',
          size: type === 'video' ? '15 Menit' : '3.5 MB',
          date: 'Hari ini',
          desc: desc,
          fileUrl: '#download-new-material'
        };
        DB.materials.unshift(newMaterial);
        showToast(`Materi ${type.toUpperCase()} baru berhasil dipublikasikan!`, 'success');
        navigateTo('view-teacher-home');
      }
    });

    // Guru Koreksi status filter tabs
    document.querySelectorAll('[data-grade-filter]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('[data-grade-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.gradeFilter = tab.getAttribute('data-grade-filter');
        renderGuruKoreksi();
      });
    });

    // Grading Modal submit
    document.getElementById('form-submit-grade').addEventListener('submit', (e) => {
      e.preventDefault();
      const score = parseInt(document.getElementById('input-grade-numeric').value, 10);
      const feedback = document.getElementById('input-grade-feedback').value.trim();

      if (isNaN(score) || score < 0 || score > 100) {
        showToast('Nilai harus berupa angka di antara 0 hingga 100.', 'error');
        return;
      }

      if (state.activeGradingSubmission) {
        state.activeGradingSubmission.score = score;
        state.activeGradingSubmission.feedback = feedback;
        
        // Also update matching record in DB.grades for e-Rapor
        const raporItem = DB.grades.find(g => g.nisn === state.activeGradingSubmission.nisn);
        if (raporItem) {
          raporItem.tugas = score;
          raporItem.akhir = Math.round((raporItem.tugas + raporItem.ujian) / 2);
          raporItem.status = raporItem.akhir >= 75 ? 'TUNTAS' : 'REMEDIAL';
        }

        showToast(`Nilai ${score} untuk ${state.activeGradingSubmission.nama} berhasil disimpan!`, 'success');
        closeGradingModal();
        renderGuruKoreksi();
      }
    });

    document.getElementById('btn-close-grading').addEventListener('click', closeGradingModal);
    document.getElementById('btn-cancel-grading').addEventListener('click', closeGradingModal);

    document.getElementById('btn-inspect-file').addEventListener('click', () => {
      showToast('Membuka pratinjau dokumen siswa dalam tab terproteksi...', 'info');
    });

    // Video Modal Close
    document.getElementById('btn-close-video').addEventListener('click', closeVideoModal);

    // Rekap Table Search
    document.getElementById('input-search-rekap').addEventListener('input', (e) => {
      state.rekapSearchQuery = e.target.value;
      renderGuruRekap();
    });

    // Excel Export Button
    document.getElementById('btn-export-excel').addEventListener('click', exportRaporExcel);

    // Bottom Navigation Bar
    document.getElementById('nav-btn-home').addEventListener('click', () => {
      if (state.currentUser) {
        navigateTo(state.currentUser.role === 'guru' ? 'view-teacher-home' : 'view-student-home');
      }
    });

    document.getElementById('nav-btn-learning').addEventListener('click', () => {
      if (state.currentUser) {
        state.currentFlow = state.currentUser.role === 'guru' ? 'guru-upload' : 'materi';
        navigateTo('view-pilih-jurusan');
      }
    });

    document.getElementById('nav-btn-rekap').addEventListener('click', () => {
      if (state.currentUser) {
        state.currentFlow = state.currentUser.role === 'guru' ? 'guru-rekap' : 'tugas';
        navigateTo('view-pilih-jurusan');
      }
    });

    document.getElementById('nav-btn-profile').addEventListener('click', () => {
      showToast(`Profil: ${state.currentUser ? state.currentUser.nama : 'Pengguna'} (${state.currentUser ? state.currentUser.role.toUpperCase() : 'Tamu'})`, 'info');
    });
  }

  // =========================================================================
  // 10. INITIALIZATION
  // =========================================================================

  initEventListeners();
  navigateTo('view-login', false);

});
