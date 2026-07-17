export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Perawatan" | "Tips" | "Mitsubishi" | "Lifestyle";
  image: string;
  author: string;
  date: string;
  readTime: number;
  seoKeywords: string[];
}

export const blogs: Blog[] = [
  {
    id: "1",
    slug: "cara-merawat-mesin-mobil",
    title: "Cara Merawat Mesin Mobil yang Baik dan Benar",
    excerpt: "Panduan lengkap merawat mesin kendaraan Anda agar tetap prima dan tahan lama.",
    content: `Mesin adalah jantung dari kendaraan Anda. Merawatnya dengan benar akan memastikan performa optimal dan masa pakai yang panjang. Berikut adalah panduan lengkap cara merawat mesin mobil:

## 1. Rutin Ganti Oli
Oli mesin berfungsi melumasi komponen internal dan mendinginkan mesin. Ganti oli setiap 10.000 km atau sesuai rekomendasi pabrikan untuk mencegah keausan dini.

## 2. Periksa Filter Udara
Filter udara yang bersih memastikan pembakaran optimal. Bersihkan atau ganti filter udara setiap 15.000-20.000 km untuk menjaga efisiensi bahan bakar.

## 3. Jaga Suhu Mesin
Selalu perhatikan pendingin mesin. Jika temperatur mesin terlalu panas, segera matikan mesin dan tunggu hingga dingin. Periksa kadar coolant secara berkala.

## 4. Gunakan Bahan Bakar Berkualitas
Gunakan bensin atau solar dari SPBU resmi untuk menghindari kerusakan mesin akibat kualitas bahan bakar yang buruk.

## 5. Jangan Memaksakan RPM Tinggi
Hindari meninggikan RPM saat mesin masih dingin. Pemanasan mesin adalah hal penting sebelum berkendara.

Dengan melakukan perawatan rutin ini, mesin mobil Anda akan berperforma maksimal dan umur pakai lebih panjang.`,
    category: "Perawatan",
    image: "https://images.unsplash.com/photo-1488824849503-c93d5d4fbf45?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-15",
    readTime: 5,
    seoKeywords: ["perawatan mesin", "cara merawat mobil", "maintenance kendaraan"],
  },
  {
    id: "2",
    slug: "pengecekan-ban-mobil-berkala",
    title: "Pentingnya Pengecekan Ban Mobil Berkala",
    excerpt: "Ban yang baik adalah kunci keselamatan berkendara. Pelajari cara merawat dan memeriksa kondisi ban.",
    content: `Ban adalah satu-satunya bagian mobil yang bersentuhan langsung dengan jalan. Kondisi ban yang buruk dapat menyebabkan kecelakaan dan mengurangi efisiensi bahan bakar.

## Pengecekan Tekanan Ban
Tekanan ban yang ideal terdapat pada spesifikasi pabrikan. Periksa tekanan ban setiap 2 minggu atau sebelum perjalanan jauh.

## Indikator Keausan Ban
Ban yang sudah mencapai batas minimum harus segera diganti. Gunakan penny test untuk memeriksa kedalaman alur ban.

## Rotasi Ban Rutin
Rotasi ban setiap 10.000 km untuk memastikan keausan yang merata pada semua ban dan memperpanjang masa pakai.

## Penyimpanan Ban Cadangan
Jika memiliki ban cadangan, simpan di tempat yang kering dan sejuk, jauh dari sinar matahari langsung.

Perawatan ban yang baik tidak hanya menghemat biaya tetapi juga menjaga keselamatan Anda di jalan.`,
    category: "Perawatan",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-14",
    readTime: 4,
    seoKeywords: ["perawatan ban", "cek tekanan ban", "keselamatan berkendara"],
  },
  {
    id: "3",
    slug: "sistem-pendingin-mobil",
    title: "Memahami dan Merawat Sistem Pendingin Mobil",
    excerpt: "Sistem pendingin yang baik mencegah mesin overheating. Ketahui cara merawatnya dengan benar.",
    content: `Sistem pendingin adalah komponen kritis yang mengatur temperatur mesin. Sistem yang bermasalah dapat menyebabkan kerusakan mesin yang serius.

## Komponen Sistem Pendingin
Sistem pendingin terdiri dari radiator, thermostat, water pump, dan selang-selang pendingin yang bekerja sama menjaga suhu optimal.

## Perawatan Radiator
Radiator membutuhkan pembersihan berkala untuk menghilangkan debu dan kotoran yang mengganggu aliran udara. Bersihkan radiator setiap 6 bulan.

## Cairan Pendingin (Coolant)
Periksa level cairan pendingin setiap bulan saat mesin dingin. Ganti cairan pendingin sesuai jadwal perawatan yang direkomendasikan.

## Tanda Masalah Pendingin
Jika mesin sering panas, suara bising dari radiator, atau cairan pendingin berkurang terus-menerus, segera bawa ke bengkel resmi.

Sistem pendingin yang terawat dengan baik adalah investasi untuk umur panjang mesin Anda.`,
    category: "Perawatan",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-13",
    readTime: 5,
    seoKeywords: ["sistem pendingin", "coolant mobil", "overheating"],
  },
  {
    id: "4",
    slug: "perawatan-aki-mobil",
    title: "Panduan Lengkap Perawatan Aki Mobil",
    excerpt: "Aki yang sehat memastikan mobil selalu mudah dihidupkan. Pelajari cara merawat aki dengan tepat.",
    content: `Aki atau baterai mobil memiliki peran penting dalam menyuplai daya listrik ke seluruh sistem mobil.

## Lihat Kondisi Visual Aki
Periksa apakah ada korosi pada terminal aki (putih, biru, atau hijau). Bersihkan dengan air dan sikat jika ada korosi.

## Pengujian Kapasitas Aki
Aki yang sehat memiliki kapasitas penuh untuk menghidupkan mesin. Jika mobil sulit dihidupkan, cek kapasitas aki di bengkel.

## Hindari Penggunaan Listrik Berlebihan
Hindari menggunakan aksesori listrik saat mesin mati terlalu lama. Ini akan menguras daya aki.

## Ganti Aki Secara Berkala
Aki umumnya bertahan 3-4 tahun. Ganti aki sebelum benar-benar mati untuk menghindari mogok di jalan.

## Tips Musim Dingin
Di musim dingin, kapasitas aki berkurang. Pastikan aki dalam kondisi prima sebelum musim dingin tiba.

Perawatan aki yang baik mencegah Anda mogok di jalan dan memastikan pengalaman berkendara yang nyaman.`,
    category: "Perawatan",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-12",
    readTime: 4,
    seoKeywords: ["perawatan aki", "baterai mobil", "terminal aki"],
  },
  {
    id: "5",
    slug: "tips-berkendara-hemat-bahan-bakar",
    title: "Tips Berkendara Hemat Bahan Bakar",
    excerpt: "Hemat bahan bakar dengan teknik berkendara yang efisien dan perawatan rutin.",
    content: `Efisiensi bahan bakar tidak hanya menghemat biaya tetapi juga ramah lingkungan. Berikut tips untuk berkendara lebih hemat:

## 1. Hindari Akselerasi Mendadak
Akselerasi yang tiba-tiba membutuhkan lebih banyak bahan bakar. Percepat perlahan untuk efisiensi maksimal.

## 2. Pertahankan Kecepatan Konstan
Kecepatan konstan lebih hemat dibanding sering mengebut dan mengerem. Gunakan cruise control di jalan tol.

## 3. Periksa Tekanan Ban
Ban yang kurang angin meningkatkan hambatan dan konsumsi bahan bakar. Pastikan tekanan ban ideal.

## 4. Kurangi Beban Tidak Perlu
Berat kendaraan mempengaruhi konsumsi bahan bakar. Buang barang yang tidak perlu dari bagasi.

## 5. Matikan Mesin Saat Parkir Lama
Meninggalkan mesin menyala membuang bahan bakar tanpa guna. Matikan mesin jika berhenti lebih dari 1 menit.

## 6. Gunakan AC Bijak
AC meningkatkan konsumsi bahan bakar. Gunakan secara terukur, terutama di kota.

Dengan tips ini, Anda bisa menghemat hingga 20% konsumsi bahan bakar.`,
    category: "Tips",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-11",
    readTime: 5,
    seoKeywords: ["hemat bahan bakar", "efisiensi bbm", "tips berkendara"],
  },
  {
    id: "6",
    slug: "servis-berkala-mobil",
    title: "Jadwal Servis Berkala Mobil yang Tepat",
    excerpt: "Servis berkala menjaga performa mobil. Ketahui jadwal servis yang direkomendasikan.",
    content: `Servis berkala adalah investasi untuk menjaga nilai dan performa mobil Anda dalam jangka panjang.

## Servis 10.000 KM
- Ganti oli dan filter oli
- Periksa tekanan ban
- Periksa sistem pengereman
- Periksa semua cairan kendaraan

## Servis 20.000 KM
- Semua poin servis 10.000 km
- Bersihkan filter udara
- Periksa AC
- Rotasi ban

## Servis 40.000 KM
- Semua poin servis berkala
- Ganti filter udara
- Periksa sistem suspensi
- Pemeriksaan menyeluruh

## Servis Mayor 80.000 KM
- Pembersihan mesin
- Pemeriksaan kopling (mobil manual)
- Pergantian fluid transmisi
- Pemeriksaan komprehensif

Jangan lewatkan jadwal servis demi keselamatan dan performa optimal kendaraan Anda.`,
    category: "Perawatan",
    image: "https://images.unsplash.com/photo-1487958449943-ff81aa08d456?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-10",
    readTime: 4,
    seoKeywords: ["servis mobil", "jadwal service", "perawatan berkala"],
  },
  {
    id: "7",
    slug: "new-xforce-fitur-unggulan",
    title: "Mengenal Fitur Unggulan New Xforce HEV",
    excerpt: "Teknologi terdepan dalam New Xforce memberikan kenyamanan dan efisiensi maksimal.",
    content: `New Xforce HEV hadir dengan inovasi yang mengubah standar SUV urban di Indonesia.

## Teknologi Hybrid MIVEC
Mesin 1.5L MIVEC Hybrid menggabungkan efisiensi dan performa. Sistem ini memberikan konsumsi bahan bakar yang sangat ekonomis tanpa mengorbankan performa.

## Transmisi CVT Smooth
CVT (Continuously Variable Transmission) memberikan akselerasi yang halus dan responsif. Perpaduan sempurna antara kenyamanan dan efisiensi.

## Desain Modern dan Sporty
Desain New Xforce mencerminkan gaya hidup urban yang dinamis. Aerodinamika yang optimal mengurangi resistansi angin dan meningkatkan efisiensi.

## Kapasitas 5 Penumpang
Ruang kabin yang luas memberikan kenyamanan untuk keluarga atau rombongan teman.

## Sistem Keselamatan Canggih
Dilengkapi dengan berbagai fitur keselamatan modern untuk melindungi Anda dan keluarga di setiap perjalanan.

## Warna Eksklusif
Tersedia dalam 6 pilihan warna eksklusif yang mencerminkan kepribadian Anda:
- Blade Silver Metallic
- Jet Black Mica
- Graphite Grey
- Quartz White Pearl
- Red Dynamic
- Gold Metallic

Harga spesial: Rp 445.000.000 untuk semua type.

New Xforce bukan hanya mobil, ini adalah gaya hidup.`,
    category: "Mitsubishi",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&q=80",
    author: "Tim Mitsubishi Serang",
    date: "2025-07-09",
    readTime: 5,
    seoKeywords: ["New Xforce", "HEV", "SUV hybrid"],
  },
  {
    id: "8",
    slug: "persiapan-mobil-musim-hujan",
    title: "Persiapan Mobil untuk Musim Hujan",
    excerpt: "Siapkan mobil Anda menghadapi musim hujan dengan perawatan yang tepat.",
    content: `Musim hujan menuntut persiapan khusus untuk memastikan keselamatan berkendara. Berikut langkah persiapannya:

## 1. Periksa Sistem Rem
Sistem rem harus dalam kondisi prima di musim hujan. Periksa kampas rem, piringan rem, dan cairan rem.

## 2. Ganti Wiper Blade
Wiper yang aus tidak akan efektif mengusir air. Ganti wiper blade sebelum musim hujan tiba.

## 3. Periksa Sistem Pencahayaan
Lampu depan dan belakang harus berfungsi optimal untuk visibilitas yang baik.

## 4. Waterproofing Kendaraan
Pastikan tidak ada celah yang bisa membuat air masuk ke interior. Periksa karet-karet jendela dan pintu.

## 5. Cek Sistem Kelistrikan
Komponen listrik harus terlindungi dari air untuk mencegah korsleting.

## 6. Gunakan Ban dengan Alur Dalam
Ban dengan alur dalam yang baik memiliki cengkeraman lebih baik di jalan basah.

## 7. Bersihkan AC Evaporator
AC yang kotor bisa menimbulkan bau di musim hujan. Bersihkan secara berkala.

Dengan persiapan yang tepat, Anda bisa berkendara aman di musim hujan.`,
    category: "Tips",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-08",
    readTime: 4,
    seoKeywords: ["musim hujan", "perawatan mobil hujan", "safety hujan"],
  },
  {
    id: "9",
    slug: "memahami-lampu-dashboard",
    title: "Memahami Arti Lampu-Lampu di Dashboard",
    excerpt: "Ketahui arti setiap lampu di dashboard untuk mendeteksi masalah lebih awal.",
    content: `Lampu-lampu di dashboard mobil adalah bahasa mesin untuk berkomunikasi dengan Anda. Pahami artinya untuk keselamatan maksimal.

## Lampu Merah (Darurat)
Lampu merah menunjukkan masalah serius yang memerlukan perhatian segera. Segera matikan mesin dan hubungi bengkel.

## Lampu Kuning (Peringatan)
Lampu kuning menandakan perlunya pemeriksaan. Jangan abaikan, karena masalah akan membesar.

## Lampu Oil Can (Oli Mesin)
Menandakan tekanan oli rendah. Matikan mesin dan periksa level oli.

## Lampu Engine Temperature
Mesin terlalu panas. Hentikan kendaraan dan tunggu hingga mesin dingin.

## Lampu Battery
Sistem charging tidak bekerja. Periksa alt atau baterai Anda.

## Lampu ABS
Sistem anti-lock brake bermasalah. Periksa di bengkel resmi.

## Lampu Airbag
Sistem airbag bermasalah. Jangan abaikan untuk keselamatan.

Jangan pernah abaikan lampu di dashboard. Lampu tersebut adalah sahabat Anda dalam mengidentifikasi masalah.`,
    category: "Tips",
    image: "https://images.unsplash.com/photo-1485291571255-e42f38d12b26?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-07",
    readTime: 4,
    seoKeywords: ["dashboard warning light", "lampu peringatan", "dashboard mobil"],
  },
  {
    id: "10",
    slug: "tips-parkir-aman",
    title: "Tips Parkir Aman dan Menjaga Kondisi Mobil",
    excerpt: "Parkir yang aman melindungi kendaraan Anda dari kerusakan dan risiko keselamatan.",
    content: `Parkir bukan sekadar meninggalkan kendaraan. Ada banyak hal yang perlu diperhatikan untuk keamanan dan kelestarian mobil.

## Pilih Tempat Parkir yang Aman
- Hindari tempat gelap dan sepi
- Parkir di area yang terang dan banyak orang
- Prioritaskan parkir di area resmi daripada ilegal
- Hindari parkir di bawah pohon besar (risiko pohon jatuh)

## Posisi Parkir yang Benar
- Parkir dengan rapi di dalam garis
- Jangan terlalu dekat dengan mobil lain
- Gunakan rem tangan
- Letakkan gigi di posisi P (automatic) atau 1 (manual)

## Perlindungan Terhadap Cuaca
- Gunakan sunshade untuk melindungi interior dari panas
- Jangan parkir terlalu lama di bawah terik matahari
- Hindari parkir saat ada risiko banjir

## Keamanan Kendaraan
- Selalu kunci pintu mobil
- Jangan tinggalkan barang berharga di dalam mobil
- Matikan mesin saat parkir lama
- Aktifkan alarm jika tersedia

## Tanda-tanda Kerusakan Parkir
- Lecet atau goresan pada body
- Lampu pecah
- Ban kempes

Parkir yang aman dimulai dari memilih lokasi yang tepat dan posisi yang benar.`,
    category: "Tips",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-06",
    readTime: 4,
    seoKeywords: ["parkir mobil", "keamanan parkir", "tips parkir"],
  },
  {
    id: "11",
    slug: "memilih-bengkel-resmi",
    title: "Mengapa Memilih Bengkel Resmi Mitsubishi",
    excerpt: "Bengkel resmi menjamin kualitas servis dan penggunaan suku cadang original.",
    content: `Memilih bengkel yang tepat adalah keputusan penting untuk umur panjang kendaraan Anda.

## Keuntungan Bengkel Resmi Mitsubishi

### Teknisi Bersertifikat
Teknisi di bengkel resmi telah dilatih khusus oleh Mitsubishi dan memahami setiap detail kendaraan Anda.

### Suku Cadang Original
Menggunakan suku cadang genuine Mitsubishi menjamin kualitas dan kompatibilitas sempurna.

### Peralatan Modern
Bengkel resmi dilengkapi dengan diagnostic tools dan equipment terbaru untuk pendeteksian masalah yang akurat.

### Garansi Resmi
Servis di bengkel resmi dilindungi oleh garansi resmi yang memberikan peace of mind.

### Standar Layanan Internasional
Bengkel resmi mengikuti standar layanan Mitsubishi global untuk konsistensi kualitas.

### Tracking Servis
Riwayat servis terekam dengan baik untuk maintenance planning yang lebih baik.

### Harga yang Transparan
Biaya servis jelas tanpa biaya tersembunyi yang mengejutkan.

## Mitsubishi Serang Siap Melayani
Bengkel resmi Mitsubishi Serang memiliki semua keuntungan di atas dengan layanan after-sales terbaik.

Investasi pada bengkel resmi adalah investasi untuk kendaraan Anda.`,
    category: "Mitsubishi",
    image: "https://images.unsplash.com/photo-1486262715619-67b519e0adf4?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-05",
    readTime: 4,
    seoKeywords: ["bengkel resmi", "mitsubishi service", "after-sales"],
  },
  {
    id: "12",
    slug: "perawatan-interior-mobil",
    title: "Panduan Merawat Interior Mobil Tetap Bersih dan Rapi",
    excerpt: "Interior yang terawat meningkatkan kenyamanan dan nilai jual kendaraan.",
    content: `Interior yang bersih dan terawat membuat berkendara lebih menyenangkan dan meningkatkan nilai jual.

## Pembersihan Rutin
- Lap dashboard dengan kain microfiber
- Bersihkan kursi dari debu dan kotoran
- Vacuum lantai dan tapak kursi secara berkala
- Bersihkan jendela dari dalam dengan glass cleaner

## Perawatan Kursi
- Gunakan kursi cover untuk melindungi upholstery
- Bersihkan noda segera dengan cleaner yang tepat
- Untuk kursi kulit, gunakan leather cleaner dan conditioner
- Hindari makanan berlemak di dalam mobil

## Perawatan Steering Wheel
- Lap steering wheel setiap hari
- Gunakan steering wheel protector
- Hindari memegang steering wheel dengan tangan yang kotor atau berkeringat

## AC dan Sirkulasi Udara
- Bersihkan filter AC secara berkala
- Gunakan AC evaporator cleaner untuk mencegah bau
- Gunakan air freshener alami seperti gel pembersih udara

## Kaca dan Rearview Mirror
- Bersihkan dengan glass cleaner secara berkala
- Jaga kejernihan untuk visibilitas optimal
- Periksa defrost untuk musim dingin

## Penyimpanan Barang
- Gunakan organizer untuk merapikan barang
- Jangan terlalu banyak barang di dalam mobil
- Hindari meninggalkan makanan atau minuman

Interior yang bersih adalah cerminan kepribadian pengemudi.`,
    category: "Perawatan",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-04",
    readTime: 4,
    seoKeywords: ["perawatan interior", "membersihkan mobil", "dashboard"],
  },
  {
    id: "13",
    slug: "emergency-kit-mobil",
    title: "Perlengkapan Emergency yang Wajib Dibawa Saat Berkendara",
    excerpt: "Emergency kit yang lengkap bisa menyelamatkan situasi darurat saat berkendara.",
    content: `Setiap pengemudi harus memiliki emergency kit untuk menghadapi situasi tak terduga di jalan.

## Perlengkapan Penting

### Spare Tire dan Jack
- Ban cadangan dalam kondisi baik
- Jack untuk mengganti ban
- Wrench atau kunci ban yang sesuai

### First Aid Kit
- Perban steril
- Antiseptic cream
- Pain reliever
- Antihistamine
- Tweezers untuk splinter

### Cairan Penting
- Extra motor oil
- Coolant atau air distilled
- Brake fluid (sesuai tipe)
- Windshield washer fluid

### Tools Dasar
- Multi-tool atau Swiss knife
- Flashlight dengan battery cadangan
- Screwdrivers set
- Wrench set
- Adjustable wrench
- Pliers

### Cables dan Wire
- Jumper cables untuk start darurat
- Duct tape
- Electrical tape
- Rope atau tali

### Lampu dan Peringatan
- Headlamp atau senter
- Warning triangle
- Bola lampu cadangan (berbagai jenis)

### Dokumen dan Alat Tulis
- License dan dokumen kendaraan
- Insurance card
- Emergency contact numbers
- Notebook dan pen

### Perlengkapan Tambahan
- Tissue dan wet wipes
- Garbage bag
- Hand gloves
- Reflective vest
- Phone charger
- Snacks dan air minum

Emergency kit yang lengkap bisa menjadi penyelamat di saat krisis.`,
    category: "Tips",
    image: "https://images.unsplash.com/photo-1595432707802-e46b1b5f0c3b?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-03",
    readTime: 5,
    seoKeywords: ["emergency kit", "perlengkapan darurat", "safety equipment"],
  },
  {
    id: "14",
    slug: "persiapan-perjalanan-jauh",
    title: "Checklist Persiapan Perjalanan Jauh dengan Mobil",
    excerpt: "Persiapan yang matang memastikan perjalanan jauh yang aman dan nyaman.",
    content: `Perjalanan jauh memerlukan persiapan yang matang untuk memastikan keselamatan dan kenyamanan.

## Pre-Trip Inspection

### Engine dan Fluid
- Periksa level dan kondisi oli
- Pastikan coolant pada level optimal
- Cek brake fluid
- Periksa kondisi battery

### Sistem Keselamatan
- Test semua rem (depan dan belakang)
- Periksa emergency brake
- Pastikan ABS berfungsi
- Test airbag light

### Ban dan Suspensi
- Periksa tekanan dan kondisi ban
- Periksa tread depth
- Pastikan tidak ada gesekan atau bunyi aneh
- Cek alignment jika perlu

### Sistem Pencahayaan
- Test semua lampu (depan, belakang, interior)
- Cek wiper dan fluid
- Pastikan fog lights berfungsi
- Bawa spare bulbs

### Perlengkapan Perjalanan

Jangan Lupa Membawa:
- Dokumen (SIM, STNK, insurance)
- Cash dan kartu kredit
- Phone dan charger
- Maps atau GPS
- Emergency kit
- Water dan snacks
- Jacket atau sweater
- Medications (jika ada)
- Entertainment (musik, audiobook)
- Sunscreen dan sunglasses

## Saat Perjalanan

### Istirahat Berkala
- Berhenti setiap 2-3 jam
- Stretch dan berjalan kaki
- Hindari berkendara saat mengantuk

### Keselamatan di Jalan
- Patuhi batas kecepatan
- Jangan menggunakan ponsel saat berkendara
- Gunakan seat belt
- Hindari berkendara di malam hari jika memungkinkan

### Penanganan Masalah
- Jika ada masalah, segera berhenti di area aman
- Hubungi roadside assistance jika perlu
- Jangan mencoba perbaikan yang berisiko

Persiapan yang baik adalah fondasi perjalanan yang aman dan menyenangkan.`,
    category: "Tips",
    image: "https://images.unsplash.com/photo-1527824050519-7cc8d92f37b8?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-02",
    readTime: 5,
    seoKeywords: ["perjalanan jauh", "road trip", "car maintenance"],
  },
  {
    id: "15",
    slug: "hybrid-technology-penjelasan",
    title: "Memahami Teknologi Hybrid dan Kelebihannya",
    excerpt: "Teknologi hybrid menggabungkan mesin bensin dan listrik untuk efisiensi maksimal.",
    content: `Teknologi hybrid adalah masa depan otomotif. Mari kita pahami cara kerjanya dan kelebihannya.

## Cara Kerja Hybrid

### Dual Power Source
- Mesin bensin untuk performa dan kecepatan tinggi
- Motor listrik untuk efisiensi dan akselerasi awal
- Kedua sistem bekerja bersama secara optimal

### Sistem Regenerative Braking
- Saat pengereman, energi dikonversi menjadi listrik
- Listrik ini disimpan di battery
- Battery kemudian memberikan energi ke motor listrik

### Smart Power Management
- Computer menentukan kapan menggunakan mesin bensin atau motor listrik
- Kombinasi optimal untuk efisiensi bahan bakar
- Automatic mode switching tanpa disadari pengemudi

## Kelebihanan Teknologi Hybrid

### 1. Efisiensi Bahan Bakar
- Konsumsi BBM hingga 40% lebih hemat
- Biaya operasional berkurang signifikan
- Semakin hemat di kota dengan banyak stop-and-go

### 2. Emisi Lebih Rendah
- Pengurangan emisi karbon hingga 50%
- Ramah lingkungan
- Membantu mengurangi polusi udara

### 3. Performa Optimal
- Akselerasi yang responsif dari low RPM
- Torque yang besar dari motor listrik
- Pengalaman berkendara yang smooth

### 4. Kurangi Keausan Mesin
- Motor listrik menangani akselerasi ringan
- Mesin bensin bekerja di RPM optimal
- Umur mesin dan komponen lebih panjang

### 5. Noise Reduction
- Motor listrik lebih senyap
- Pengalaman berkendara yang lebih tenang
- Terutama di kota saat traffic

## Maintenance Hybrid

### Lebih Mudah
- Brake pad tahan lebih lama (regenerative braking)
- Lebih sedikit fluid yang perlu diganti
- Battery managingnya automatic

### Battery Lifespan
- Hybrid battery biasanya bertahan 150,000-200,000 km
- Warranty coverage 8-10 tahun
- Replacement cost yang reasonable

## Mitsubishi Xforce HEV

New Xforce dengan teknologi MIVEC Hybrid memberikan:
- Efisiensi maksimal untuk penggunaan urban
- Akselerasi yang responsif
- Emisi yang rendah
- Pengalaman berkendara premium

Hybrid technology adalah pilihan cerdas untuk masa depan yang lebih hijau.`,
    category: "Mitsubishi",
    image: "https://images.unsplash.com/photo-1554744512-d2c14020371e?w=800&q=80",
    author: "Tim Layanan Mitsubishi Serang",
    date: "2025-07-01",
    readTime: 6,
    seoKeywords: ["hybrid technology", "hybrid engine", "efisiensi bahan bakar"],
  },
];
