import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kemahasiswaan-6",
  templateUrl: "./kemahasiswaan-6.component.html",
  styleUrls: ["./kemahasiswaan-6.component.scss"],
})
export class Kemahasiswaan6Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData1: Array<any> = [];
  public listData2: Array<any> = [];
  public listDataperGedung;
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 600, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: {
      bar: { borderRadius: 5, distributed: true, horizontal: true },
    },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Penghuni Asrama per Fakultas" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Mahasiswa";
        },
      },
    },
    xaxis: {},
  };
  public chartConfig2 = {
    chart: { height: 450, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { position: "top", horizontalAlign: "right", offsetX: 40 },
    plotOptions: {
      bar: { borderRadius: 5, horizontal: true, distributed: true },
    },
    series: [],
    stroke: { width: 1, colors: ["#fff"] },
    title: { text: "Penghuni Asrama per Gedung", align: "center" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Mahasiswa";
        },
      },
    },
    xaxis: {},
  };
  public chartConfig3 = {
    chart: { height: 500, type: "donut" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    labels: [],
    legend: { position: "bottom", show: true },
    plotOptions: {
      pie: {
        donut: {
          labels: { name: { show: true }, show: true, value: { show: true } },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 }, legend: { position: "bottom" } },
      },
    ],
    series: [],
    title: { align: "center", text: "Penghuni Asrama per Gender" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
    },
  };
  public chartConfig4 = {
    chart: { type: "bar", height: 450 },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    fill: { opacity: 1 },
    plotOptions: {
      bar: {
        borderRadius: 5,
        // columnWidth: "55%",
        distributed: true,
        endingShape: "rounded",
        // horizontal: false,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    series: [],
    stroke: { show: true, width: 2, colors: ["transparent"] },
    title: { text: "Rekapitulasi Penghuni Asrama", align: "center" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Mahasiswa";
        },
      },
    },
    xaxis: {},
    yaxis: { title: { text: "Jumlah Mahasiswa" } },
  };

  constructor(
    public translateService: TranslateService,
    private broadcasterService: BroadcasterService,
    private appService: AppService
  ) {
    translateService.setDefaultLang(localStorage.getItem("lang"));
    broadcasterService.changeLangBroadcast$.subscribe((res) => {
      translateService.setDefaultLang(res.lang);
    });
  }

  ngOnInit(): void {
    this.GetListData();
    const element = document.getElementById("auto-clicked");
    element.click();
  }

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  GetListData(): void {
    this.spinnerLoading = true;
    this.listData1 = [];

    this.appService.getFakeDataKemahasiswaan().subscribe(
      (response) => {
        for (const val of response) {
          if (val.students_id === "STD-006") {
            this.listData1 = val.data_1;
            this.listData2 = val.data_2;
            this.listDataperGedung = val.datapergedung;
            this.chart_A();
            this.chart_B();
            this.chart_C();
            this.chart_D();
            break;
          }
        }

        this.dtTrigger.next(); // Trigger for load datatable
        this.spinnerLoading = false;
      },
      (error) => {
        this.spinnerLoading = false;

        Swal.fire("Error API", "Get List Data", "error");
      }
    );
  }

  public chart_A() {
    const dataFakultas: string[] = [];
    const dataPenghuniAsrama: number[] = [];
    for (const item of this.listData1) {
      dataFakultas.push(item.faculty);
      dataPenghuniAsrama.push(
        item.regular_student.gedung_a.putra +
          item.regular_student.gedung_a.putri +
          item.scholarship_student.gedung_a.putra +
          item.scholarship_student.gedung_a.putri +
          item.foreign_student.gedung_a.putra +
          item.foreign_student.gedung_a.putri +
          item.regular_student.gedung_b.putra +
          item.regular_student.gedung_b.putri +
          item.scholarship_student.gedung_b.putra +
          item.scholarship_student.gedung_b.putri +
          item.foreign_student.gedung_b.putra +
          item.foreign_student.gedung_b.putri +
          item.regular_student.gedung_c.putra +
          item.regular_student.gedung_c.putri +
          item.scholarship_student.gedung_c.putra +
          item.scholarship_student.gedung_c.putri +
          item.foreign_student.gedung_c.putra +
          item.foreign_student.gedung_c.putri +
          item.regular_student.gedung_d.putra +
          item.regular_student.gedung_d.putri +
          item.scholarship_student.gedung_d.putra +
          item.scholarship_student.gedung_d.putri +
          item.foreign_student.gedung_d.putra +
          item.foreign_student.gedung_d.putri
      );
    }

    this.chartConfig1.series = [
      { name: "Jumlah Penghuni Asrama", data: dataPenghuniAsrama },
    ];

    this.chartConfig1.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig1;
  }
  public chart_B() {
    this.chartConfig2.series = [
      {
        name: "Jumlah Penghuni Asrama",
        data: [
          this.listDataperGedung.total_gedung_a,
          this.listDataperGedung.total_gedung_b,
          this.listDataperGedung.total_gedung_c,
          this.listDataperGedung.total_gedung_d,
        ],
      },
    ];

    this.chartConfig2.xaxis = {
      categories: ["Gedung A", "Gedung B", "Gedung C", "Gedung D"],
    };

    return this.chartConfig2;
  }
  public chart_C() {
    this.chartConfig3.series = [8456, 6233];

    this.chartConfig3.labels = ["Putra", "Putri"];

    return this.chartConfig3;
  }

  public chart_D() {
    this.chartConfig4.series = [
      { name: "Jumlah", data: [1000, 800, 750, 700, 650, 1000] },
    ];

    this.chartConfig4.xaxis = {
      categories: [
        "Pendaftar",
        "Lolos Seleksi",
        "Registrasi",
        "Pembayaran",
        "Penghuni",
        "Total Kapasitas",
      ],
    };

    return this.chartConfig4;
  }
}
