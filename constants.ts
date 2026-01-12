import { Question, Solution, Gender, RelationshipStatus } from './types';

export const QUESTIONS: Question[] = [
  // --- KOMUNIKASI ---
  {
    id: 1,
    category: 'Komunikasi',
    text: 'Seberapa sering kamu mendiamkan pasangan (silent treatment) ketika ada masalah?',
    weight: 2
  },
  {
    id: 2,
    category: 'Komunikasi',
    text: 'Apakah kamu merasa pasanganmu terlalu sensitif saat kamu bercanda kasar?',
    weight: 1
  },
  {
    id: 3,
    category: 'Komunikasi',
    text: 'Seberapa sering kamu memotong pembicaraan pasangan karena merasa pendapatmu lebih benar?',
    weight: 2
  },
  {
    id: 4,
    category: 'Komunikasi',
    text: 'Apakah kamu menyembunyikan chat atau riwayat panggilan dari pasangan?',
    weight: 3,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED, RelationshipStatus.EX_DATING]
  },

  // --- KONTROL & KECEMBURUAN ---
  {
    id: 5,
    category: 'Kontrol',
    text: 'Apakah kamu merasa berhak tahu password media sosial pasangan?',
    weight: 2,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },
  {
    id: 6,
    category: 'Kontrol',
    text: 'Seberapa sering kamu melarang pasangan bertemu teman-temannya?',
    weight: 3,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },
  {
    id: 7,
    category: 'Kontrol',
    text: 'Apakah kamu sering mengecek lokasi (live location) pasangan secara diam-diam?',
    weight: 2,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },
  {
    id: 8,
    category: 'Kontrol',
    text: 'Jika pasanganmu tidak membalas chat dalam 10 menit, apakah kamu langsung menuduhnya macam-macam?',
    weight: 2
  },

  // --- EMOSI & KEKERASAN (Very High Weight) ---
  {
    id: 9,
    category: 'Emosi',
    text: 'Pernahkah kamu membentak atau berkata kasar saat marah besar?',
    weight: 3
  },
  {
    id: 10,
    category: 'Emosi',
    text: 'Apakah kamu pernah melempar barang atau memukul tembok saat emosi?',
    weight: 3
  },
  {
    id: 11,
    category: 'Emosi',
    text: 'Apakah kamu merasa pasanganmu pantas dimarahi jika dia melakukan kesalahan sepele?',
    weight: 2
  },

  // --- KEJUJURAN & KOMITMEN ---
  {
    id: 12,
    category: 'Kejujuran',
    text: 'Pernahkah kamu berbohong soal keuangan/pengeluaran kepada pasangan?',
    weight: 2,
    applicableStatus: [RelationshipStatus.MARRIED]
  },
  {
    id: 13,
    category: 'Kejujuran',
    text: 'Apakah kamu masih sering stalking mantan di media sosial?',
    weight: 1,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED, RelationshipStatus.SINGLE]
  },
  {
    id: 14,
    category: 'Kejujuran',
    text: 'Pernahkah kamu menginstal aplikasi kencan (dating app) saat masih dalam hubungan?',
    weight: 3,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },

  // --- MENIKAH SPECIFIC ---
  {
    id: 15,
    category: 'Tanggung Jawab',
    text: 'Apakah kamu sering menyerahkan semua urusan rumah tangga kepada pasangan?',
    weight: 2,
    applicableStatus: [RelationshipStatus.MARRIED]
  },
  {
    id: 16,
    category: 'Tanggung Jawab',
    text: 'Apakah kamu sering mengkritik cara pasangan mengasuh anak di depan orang lain?',
    weight: 2,
    applicableStatus: [RelationshipStatus.MARRIED],
    minAge: 25
  },
  {
    id: 17,
    category: 'Keuangan',
    text: 'Apakah kamu sering mengambil keputusan finansial besar tanpa diskusi?',
    weight: 3,
    applicableStatus: [RelationshipStatus.MARRIED]
  },

  // --- SINGLE/DATING (TEEN/YOUNG ADULT) ---
  {
    id: 18,
    category: 'Perilaku',
    text: 'Apakah kamu sering membuat "test" atau drama untuk melihat reaksi orang?',
    weight: 1,
    minAge: 15,
  },

  // --- GENDER SPECIFIC NUANCES (Stereotype aware but balanced) ---
  // Pria
  {
    id: 19,
    category: 'Ego',
    text: 'Apakah kamu merasa pekerjaan pasangan tidak lebih penting dari pekerjaanmu?',
    weight: 2,
    applicableGender: [Gender.MALE],
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },
  // Wanita
  {
    id: 20,
    category: 'Ego',
    text: 'Apakah kamu menuntut pasangan untuk selalu mengerti kode (baca pikiran) tanpa kamu bicara?',
    weight: 2,
    applicableGender: [Gender.FEMALE],
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },

  // --- GENERAL ---
  {
    id: 21,
    category: 'Perilaku',
    text: 'Apakah kamu sering playing victim (merasa jadi korban) agar pasangan minta maaf duluan?',
    weight: 3
  },
  {
    id: 22,
    category: 'Perilaku',
    text: 'Apakah kamu sulit mengakui kesalahan dan meminta maaf?',
    weight: 2
  },
  {
    id: 23,
    category: 'Perilaku',
    text: 'Apakah kamu sering membandingkan pasanganmu saat ini dengan mantan?',
    weight: 3,
    applicableStatus: [RelationshipStatus.DATING, RelationshipStatus.MARRIED]
  },
  {
    id: 24,
    category: 'Perilaku',
    text: 'Apakah kamu merasa pasanganmu beruntung mendapatkanmu, tapi kamu tidak merasa sebaliknya?',
    weight: 2
  },
  {
    id: 25,
    category: 'Perilaku',
    text: 'Jika pasangan menangis karena ulahmu, apakah kamu justru marah?',
    weight: 3
  }
];

export const SOLUTIONS: Solution[] = [
  {
    category: 'Komunikasi',
    scoreRange: [0, 1], // Low Red Flag
    title: 'Komunikator Handal',
    description: 'Kamu hebat! Caramu berkomunikasi sudah dewasa.',
    advice: [
      'Pertahankan gaya bicaramu yang tenang.',
      'Tetap jadi pendengar yang baik untuk pasanganmu.'
    ]
  },
  {
    category: 'Komunikasi',
    scoreRange: [1.1, 3], // High Red Flag (Average > 1 approx)
    title: 'Perlu Belajar Bicara',
    description: 'Hati-hati, cara komunikasimu bisa bikin pasangan makan hati.',
    advice: [
      'Hindari "Silent Treatment", itu menyiksa mental pasangan.',
      'Belajar validasi perasaan pasangan, jangan dibilang baperan.',
      'Kalau salah, minta maaf. Itu gak bikin harga dirimu jatuh kok.'
    ]
  },
  {
    category: 'Kontrol',
    scoreRange: [0, 1],
    title: 'Pasangan Suportif',
    description: 'Kamu memberikan ruang yang sehat untuk pasangan berkembang.',
    advice: [
      'Kepercayaan adalah kunci, dan kamu sudah memilikinya.',
      'Terus dukung hobi dan pertemanan pasanganmu.'
    ]
  },
  {
    category: 'Kontrol',
    scoreRange: [1.1, 3],
    title: 'Posesif Berlebihan',
    description: 'Kamu mungkin merasa ini bentuk sayang, tapi ini mengekang.',
    advice: [
      'Pasanganmu bukan milikmu sepenuhnya, dia punya kehidupan sendiri.',
      'Cek HP diam-diam itu pelanggaran privasi, bukan bentuk perhatian.',
      'Kurangi rasa curiga, itu racun buat pikiranmu sendiri.'
    ]
  },
  {
    category: 'Emosi',
    scoreRange: [0, 1],
    title: 'Stabil Secara Emosi',
    description: 'Kamu bisa mengelola amarah dengan baik. Keren!',
    advice: [
      'Tetap sabar meski situasi memanas.',
      'Jadilah penenang saat pasanganmu sedang panik.'
    ]
  },
  {
    category: 'Emosi',
    scoreRange: [1.1, 3],
    title: 'Bom Waktu',
    description: 'Emosimu yang meledak-ledak sangat berbahaya bagi hubungan.',
    advice: [
      'Jika marah, ambil jeda (time-out) 30 menit sebelum bicara.',
      'Kekerasan fisik atau verbal TIDAK PERNAH bisa dibenarkan.',
      'Cari bantuan profesional jika kamu sulit menahan amarah.'
    ]
  },
  {
    category: 'Keuangan',
    scoreRange: [1.1, 3],
    title: 'Dittator Keuangan',
    description: 'Uang bisa jadi sumber konflik utama jika kamu otoriter.',
    advice: [
      'Diskusikan pengeluaran besar bersama pasangan.',
      'Jangan sembunyikan hutang atau tagihan.',
      'Transparansi adalah fondasi rumah tangga yang kuat.'
    ]
  },
  {
    category: 'Tanggung Jawab',
    scoreRange: [1.1, 3],
    title: 'Lepas Tangan',
    description: 'Hubungan itu kerjasama tim, bukan one man show.',
    advice: [
      'Jangan bebankan semua urusan rumah/anak ke pasangan.',
      'Inisiatif bantu tanpa diminta itu seksi lho.',
      'Hargai lelahnya pasanganmu dengan tindakan nyata.'
    ]
  },
  {
    category: 'Ego',
    scoreRange: [1.1, 3],
    title: 'Si Paling Benar',
    description: 'Ego yang tinggi adalah tembok penghalang kemesraan.',
    advice: [
      'Turunkan sedikit egomu demi keharmonisan.',
      'Mengalah bukan berarti kalah.',
      'Jangan menuntut pasangan jadi dukun yang bisa baca pikiranmu.'
    ]
  }
];

export const QUESTIONS_PER_PAGE = 5; // Updated to 5 to fit screens better
export const LOCAL_STORAGE_KEY = 'redFlagScore_v2'; // Bump version