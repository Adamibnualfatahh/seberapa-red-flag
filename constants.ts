import { Question } from './types';

export const QUESTIONS: Question[] = [
  // A. Komunikasi
  { id: 1, category: 'Komunikasi', text: 'Seberapa sering kamu membalas chat pasangan secara instan?' },
  { id: 2, category: 'Komunikasi', text: 'Apakah kamu mudah cemburu tanpa alasan?' },
  { id: 3, category: 'Komunikasi', text: 'Apakah kamu sering menyembunyikan sesuatu dari pasangan?' },
  
  // B. Kontrol
  { id: 4, category: 'Kontrol', text: 'Apakah kamu ingin pasangan selalu memberi kabar kegiatan sehari-hari?' },
  { id: 5, category: 'Kontrol', text: 'Pernahkah kamu melarang pasangan bertemu teman lawan jenis?' },
  { id: 6, category: 'Kontrol', text: 'Seberapa sering kamu marah ketika pasangan tidak melakukan apa yang kamu inginkan?' },
  { id: 7, category: 'Kontrol', text: 'Apakah kamu suka mengecek HP pasangan tanpa izin?' },

  // C. Kejujuran & Loyalitas
  { id: 8, category: 'Kejujuran', text: 'Pernahkah kamu berbohong kecil kepada pasangan?' },
  { id: 9, category: 'Kejujuran', text: 'Pernahkah kamu ghosting atau membatalkan janji tanpa alasan?' },
  { id: 10, category: 'Kejujuran', text: 'Seberapa sering kamu menguji kesetiaan pasangan?' },
  { id: 11, category: 'Kejujuran', text: 'Pernahkah kamu selingkuh?' },

  // D. Emosi & Stabilitas
  { id: 12, category: 'Emosi', text: 'Apakah kamu mudah marah karena hal kecil?' },
  { id: 13, category: 'Emosi', text: 'Apakah kamu pernah menyakiti pasangan secara verbal atau fisik?' },
  { id: 14, category: 'Emosi', text: 'Bagaimana reaksi kamu saat pasangan berbeda pendapat denganmu? (Buruk/Negatif)' },
  { id: 15, category: 'Emosi', text: 'Apakah kamu cepat merasa tersinggung dengan komentar pasangan?' },

  // E. Riwayat / Latar Belakang
  { id: 16, category: 'Riwayat', text: 'Apakah hubunganmu sebelumnya berakhir buruk karena kesalahanmu?' },
  { id: 17, category: 'Riwayat', text: 'Apakah keluarga atau teman sering memperingatkan sifatmu?' },
  { id: 18, category: 'Riwayat', text: 'Pernahkah kamu putus karena konflik yang sama berulang kali?' },
  { id: 19, category: 'Riwayat', text: 'Apakah kamu mudah bosan dalam hubungan?' },

  // F. Kebiasaan / Perilaku
  { id: 20, category: 'Perilaku', text: 'Apakah kamu sering membandingkan pasangan dengan orang lain?' },
  { id: 21, category: 'Perilaku', text: 'Seberapa sering kamu menunda menyelesaikan masalah dalam hubungan?' },
  { id: 22, category: 'Perilaku', text: 'Apakah kamu sering mengontrol keuangan pasangan?' },
  { id: 23, category: 'Perilaku', text: 'Apakah kamu sulit memaafkan kesalahan pasangan?' },
  { id: 24, category: 'Perilaku', text: 'Apakah kamu sering mengancam putus saat marah?' },
  { id: 25, category: 'Perilaku', text: 'Apakah kamu sering bersikap dingin atau silent treatment?' },
];

export const QUESTIONS_PER_PAGE = 4;
export const LOCAL_STORAGE_KEY = 'redFlagScore_v1';