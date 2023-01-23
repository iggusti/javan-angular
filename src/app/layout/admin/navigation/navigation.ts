import { OauthService } from "src/app/_services/oauth.service";
import { Injectable } from "@angular/core";

export interface NavigationItem {
  id: string;
  title: string;
  type: "item" | "collapse" | "group";
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 0,
    title: "Dashboard",
    type: "group",
    children: [
      {
        id: 0,
        title: "Home",
        type: "item",
        url: "/home",
        classes: "nav-item",
        icon: "ti-home",
      },
    ],
  },
  {
    id: 1,
    title: "JAVAN",
    type: "group",
    children: [
      {
        id: 0,
        title: "List",
        type: "item",
        url: "/javan/list",
        classes: "nav-item",
        icon: "ti-home",
      },
      {
        id: 0,
        title: "Add",
        type: "item",
        url: "/javan/add",
        classes: "nav-item",
        icon: "ti-home",
      },
      {
        id: 0,
        title: "Edit",
        type: "item",
        url: "/javan/edit",
        classes: "nav-item",
        icon: "ti-home",
      },
      {
        id: 0,
        title: "View",
        type: "item",
        url: "/javan/view",
        classes: "nav-item",
        icon: "ti-home",
      },
    ],
  },
  {
    id: 2,
    title: "Kegiatan",
    type: "group",
    children: [
      {
        id: 0,
        title: "Bid. Akademik",
        type: "collapse",
        icon: "ti-bookmark-alt",
        children: [
          {
            id: 0,
            title: "Rekapitulasi Akreditasi Program Studi",
            type: "item",
            url: "/akademik/1",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 1,
            title: "Rekapitulasi Akreditasi Program Studi Per Fakultas",
            type: "item",
            url: "/akademik/2",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 2,
            title: "Jumlah Mahasiswa",
            type: "item",
            url: "/akademik/3",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 3,
            title: "Penerimaan Mahasiswa Baru Rekap Umum",
            type: "item",
            url: "/akademik/4",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 4,
            title: "Penerimaan Mahasiswa Baru Rekap Program Studi",
            type: "item",
            url: "/akademik/5",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 5,
            title: "Mahasiswa Registrasi",
            type: "item",
            url: "/akademik/6",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 6,
            title: "Demografi Mahasiswa Aktif Berdasarkan Kewarganegaraan",
            type: "item",
            url: "/akademik/7",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 7,
            title:
              "Demografi Mahasiswa Aktif Berdasarkan Jenins Kelamin dan Pekerjaan Orang Tua",
            type: "item",
            url: "/akademik/8",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 8,
            title: "Demografi Mahasiswa Aktif Berdasarkan Domisili",
            type: "item",
            url: "/akademik/9",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
        ],
      },
      {
        id: 1,
        title: "Bid. Kemahasiswaan",
        type: "collapse",
        icon: "ti-bookmark-alt",
        children: [
          {
            id: 0,
            title: "Prestasi Mahasiswa",
            type: "item",
            url: "/kemahasiswaan/1",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 1,
            title: "Organisasi Mahasiswa",
            type: "item",
            url: "/kemahasiswaan/2",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 2,
            title: "Beasiswa",
            type: "item",
            url: "/kemahasiswaan/3",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 3,
            title: "Tracer Study",
            type: "item",
            url: "/kemahasiswaan/4",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 4,
            title: "Pengguna Lulusan",
            type: "item",
            url: "/kemahasiswaan/5",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 5,
            title: "Asrama",
            type: "item",
            url: "/kemahasiswaan/6",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
        ],
      },
      {
        id: 2,
        title: "Bid. Kerja Sama",
        type: "collapse",
        icon: "ti-bookmark-alt",
        children: [
          {
            id: 0,
            title:
              "Pemberian reward Program Studi penerima anugerah kerja sama terbaik",
            type: "item",
            url: "/kerja-sama/1",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 1,
            title:
              "Pemberian reward Program Studi yang melaksanakan kerja sama MBKM",
            type: "item",
            url: "/kerja-sama/2",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 2,
            title: "Bidik Kerja Sama Dalam Negeri",
            type: "item",
            url: "/kerja-sama/3",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 3,
            title: "Jumlah Implementasi Kerja Sama Melibatkan ABGCM",
            type: "item",
            url: "/kerja-sama/4",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 4,
            title:
              "Jumlah Perolehan Dana Kerja Sama Nasional Dalam Milyar Rupiah",
            type: "item",
            url: "/kerja-sama/5",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 5,
            title:
              "Jumlah Perolehan Dana Kerja Sama Internasional Dalam Milyar Rupiah",
            type: "item",
            url: "/kerja-sama/6",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 6,
            title: "Jumlah Peserta Internasional Summer Course",
            type: "item",
            url: "/kerja-sama/7",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 7,
            title: "Jumlah Dosen Asing",
            type: "item",
            url: "/kerja-sama/8",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 8,
            title:
              "Persentase Program Studi S1 Dan D4/D3/D2 Yang Melaksanakan Kerja Sama Dengan Mitra",
            type: "item",
            url: "/kerja-sama/9",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 9,
            title:
              "Persentase dosen yang berkegiatan tridarma di kampus lain, di QS100 berdasarkan bidang ilmu (QS100 by subject)",
            type: "item",
            url: "/kerja-sama/10",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 10,
            title:
              "Persentase Dosen Yang Bekerja Sebagai Praktisi Di Dunia Industri",
            type: "item",
            url: "/kerja-sama/11",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 11,
            title:
              "Persentase dosen yang membina mahasiswa yang berhasil meraih prestasi paling rendah tingkat nasional dalam 5 (lima) tahun terakhir",
            type: "item",
            url: "/kerja-sama/12",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
        ],
      },
      {
        id: 3,
        title: "Bid. Penelitian dan Pengabdian Masyarakat",
        type: "collapse",
        icon: "ti-bookmark-alt",
        children: [
          {
            id: 0,
            title:
              "Hasil Pelaksanaan Monev Kinerja Penelitian Dosen Tahun 2016 s/d 2018",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/1",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 1,
            title:
              "Hasil Pelaksanaan Monev Kinerja PPM Dosen Berdasarkan Sumber Pendanaan Tahun 2016 s/d 2018",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/2",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 2,
            title: "Capaian Kinerja Lembaga Penelitian 2017 s/d 2018",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/3",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 3,
            title: "Jumlah Proposal Talenta",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/4",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 4,
            title: "Jumlah Proposal yang Lolos Seleksi SUmber Pendanaan DRPM",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/5",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 5,
            title:
              "Jumlah Judul yang Didanai Per Skema Sumber Pendanaan Non PNBP",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/6",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 6,
            title:
              "Jumlah Judul Penelitian dan Dana yang Diperoleh Sumber Pendanaan DRPM / KEDAIREKA / BRIN / LPDP dan Pemberi Dana Eksternal Lainnya",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/7",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 7,
            title:
              "Jumlah Karya Ilmiah Selama 5 Tahun Terakhir dan Kualitasnya",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/8",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 8,
            title: "Jenis Proposal Pengabdian Kepada Masyarakat Dosen USU 2018",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/9",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 9,
            title: "Pengabdian Pada Masyarakat oleh Dosen USU Tahun 2018",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/10",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 10,
            title:
              "Distribusi Pengabdian Kepada Masyarakat Civitas Akademika USU Sesuai Goal SDG",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/11",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 11,
            title: "Daftar HKI",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/12",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 12,
            title: "Asal Publikasi",
            type: "item",
            url: "/penelitian-dan-pengabdian-masyarakat/13",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
        ],
      },
      {
        id: 4,
        title: "Bid. Sumber Daya Manusia",
        type: "collapse",
        icon: "ti-bookmark-alt",
        children: [
          {
            id: 0,
            title: "Kepegawaian (Tenaga Penunjang Akademik / Non Dosen)",
            type: "item",
            url: "/sumber-daya-manusia/1",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 1,
            title:
              "Kepegawaian (Tenaga Penunjang Akademik / Non Dosen) Bagian Pelaksana Akademik",
            type: "item",
            url: "/sumber-daya-manusia/2",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 2,
            title:
              "Kepegawaian (Tenaga Penunjang Akademik / Non Dosen) Bagian Pelaksana Administrasi",
            type: "item",
            url: "/sumber-daya-manusia/3",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 3,
            title:
              "Kepegawaian (Tenaga Penunjang Akademik / Non Dosen) Bagian Penunjang Administrasi",
            type: "item",
            url: "/sumber-daya-manusia/4",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 4,
            title:
              "Kepegawaian (Tenaga Penunjang Akademik / Non Dosen) Pendukung Organ Lainnya",
            type: "item",
            url: "/sumber-daya-manusia/5",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 5,
            title: "Sertifikasi TPA",
            type: "item",
            url: "/sumber-daya-manusia/6",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 6,
            title: "Kepegawaian (Dosen)",
            type: "item",
            url: "/sumber-daya-manusia/7",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 7,
            title: "Dosen Berkegiatan Tridharma Di Kampus Lain",
            type: "item",
            url: "/sumber-daya-manusia/8",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 8,
            title:
              "Dosen Berkegiatan Tridharma Di Kampus QS100 Berdasarkan Ilmu",
            type: "item",
            url: "/sumber-daya-manusia/9",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 9,
            title: "Dosen Berkegiatan Kerja Sebagai Praktisi Di Dunia Industri",
            type: "item",
            url: "/sumber-daya-manusia/10",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 10,
            title: "Dosen Yang Memiliki Sertifikasi Kompetensi",
            type: "item",
            url: "/sumber-daya-manusia/11",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 11,
            title: "Dosen Yang Memiliki Sertifikasi Profesi",
            type: "item",
            url: "/sumber-daya-manusia/12",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
          {
            id: 12,
            title:
              "Dosen Yang Memiliki Pengalaman Profesional Di Dunia Industri Dan Dunia Kerja",
            type: "item",
            url: "/sumber-daya-manusia/13",
            classes: "nav-item",
            icon: "ti-flag-alt-2",
          },
        ],
      },
    ],
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
