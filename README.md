# PAW Git — Mini Project TypeScript

Mini project halaman **Ruang Produktif Mahasiswa** untuk mengenalkan HTML, CSS,
TypeScript, dan alur kerja Git kepada mahasiswa.

## Fitur

- Menambah kegiatan baru.
- Menandai kegiatan yang sudah selesai.
- Menghapus satu kegiatan atau semua kegiatan selesai.
- Menghitung progres secara otomatis.
- Menyimpan data di `localStorage` browser.
- Tampilan responsif untuk desktop dan ponsel.

## Menjalankan project

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Vite di terminal.

## Membuat build production

```bash
npm run build
npm run preview
```

Hasil build akan dibuat di folder `dist`.

## Struktur project

```text
.
├── index.html
├── package.json
├── tsconfig.json
└── src
    ├── main.ts
    └── style.css
```

## Alur Git yang digunakan

```bash
git init
git branch -M main
git add .
git commit -m "feat: add TypeScript student activity page"
git remote add origin https://github.com/dthanfirdausx/pawgit.git
git push -u origin main
```

Perintah `git push` mengirim commit lokal ke repository GitHub. Opsi `-u`
menghubungkan branch lokal `main` dengan branch `origin/main`, sehingga push
berikutnya cukup menggunakan `git push`.
