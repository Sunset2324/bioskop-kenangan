// src/data/changelog.ts

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export const changelogData: ChangelogEntry[] = [
  {
    version: "v1.1.0",
    date: "1 Oktober 2026",
    title: "Pembaruan Fitur & Perbaikan",
    changes: [
      "Menambahkan tombol 'Kembali' dan 'Kunci Ulang' untuk navigasi yang lebih mudah.",
      "Memperbaiki error loading pada pemutar video.",
      "Menambahkan catatan pembaruan ini!",
      "Peningkatan performa dan stabilitas aplikasi.",
      "Menambahkan fitur thumbnail untuk film yang tidak memiliki gambar."
    ]
  },
  {
    version: "v1.0.0",
    date: "2 Agustus 2026",
    title: "Peluncuran Awal Bioskop",
    changes: [
      "Aplikasi Bioskop Core Memory resmi diluncurkan.",
      "Fitur login privat dan halaman amplop pembuka.",
      "Kategori film dan pemutar video terintegrasi."
    ]
  }
];