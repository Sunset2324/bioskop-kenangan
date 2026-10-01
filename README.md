# 🎬 Bioskop Kenangan (Core Memory Cinema)

Sebuah aplikasi web privat dan sinematik untuk menyimpan, mengatur, dan menonton ulang kenangan berharga dalam bentuk video. Aplikasi ini menggunakan autentikasi ketat sehingga hanya orang-orang tertentu yang dapat mengakses "bioskop" ini.

## ✨ Fitur Utama
- **Autentikasi Privat**: Login menggunakan email & password (Supabase Auth).
- **Landing Page Sinematik**: Animasi pembuka surat interaktif sebelum memasuki bioskop.
- **Kategori & Galeri**: Pengelompokan film/kenangan berdasarkan kategori dengan UI yang elegan.
- **Pemutar Video Terintegrasi**: Streaming langsung dari Google Drive menggunakan Cloudflare Worker (untuk menghindari CORS/blocked iframe).

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend & Database**: Supabase (PostgreSQL, Auth)
- **Icons**: Lucide React