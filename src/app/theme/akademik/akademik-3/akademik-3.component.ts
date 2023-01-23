import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-3",
  templateUrl: "./akademik-3.component.html",
  styleUrls: ["./akademik-3.component.scss"],
})
export class Akademik3Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
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
    title: { text: "Rekapitulasi Jumlah Mahasiswa", align: "center" },
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
  public chartConfig2 = {
    series: [],
    chart: { height: 500, type: "line", zoom: { enabled: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "straight" },
    title: { text: "Trend Jumlah Mahasiswa Aktif", align: "center" },
    grid: { row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 } },
    xaxis: {},
    yaxis: { title: { text: "Jumlah Mahasiswa Aktif" } },
  };
  public chartConfig3 = {
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
        // distributed: true,
        endingShape: "rounded",
        // horizontal: false,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    series: [],
    stroke: { show: true, width: 2, colors: ["transparent"] },
    title: {
      align: "center",
      text: "Jumlah Mahasiswa Baru Berdasarkan Jenis Pendaftaran dan Mahasiswa Aktif Per Semester",
    },
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

  public totalAktif: number = 0;
  public totalCuti: number = 0;
  public totalNonAktif: number = 0;
  public totalLulus: number = 0;
  public totalUndurDiri: number = 0;
  public totalMeninggal: number = 0;
  public totalPindahProdi: number = 0;
  public totalInbound: number = 0;
  public totalOutbound: number = 0;

  GetListData(): void {
    this.spinnerLoading = true;
    this.listData = [];

    this.appService.getFakeDataAkademik().subscribe(
      (response) => {
        for (const val of response) {
          if (val.academic_id === "ACA-003") {
            this.listData = val.data;
            this.chart_A();
            this.chart_B();
            this.chart_C();
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

  chart_A() {
    let total: any = {
      Aktif: 0,
      Cuti: 0,
      NonAktif: 0,
      Lulus: 0,
      UndurDiri: 0,
      Meninggal: 0,
      PindahProdi: 0,
      Inbound: 0,
      Outbound: 0,
    };
    for (let i = 0; i < this.listData.length; i++) {
      total.Aktif +=
        this.listData[i].active.regular + this.listData[i].active.transfer;
      total.Cuti +=
        this.listData[i].cuti.regular + this.listData[i].cuti.transfer;
      total.NonAktif +=
        this.listData[i].non_active.regular +
        this.listData[i].non_active.transfer;
      total.Lulus += this.listData[i].graduated;
      total.UndurDiri += this.listData[i].resign;
      total.Meninggal += this.listData[i].die;
      total.PindahProdi += this.listData[i].switch_study_program;
      total.Inbound += this.listData[i].inbound;
      total.Outbound += this.listData[i].outbound;
    }

    this.chartConfig1.series = [
      {
        name: "Jumlah Mahasiswa",
        data: [
          total.Aktif,
          total.Cuti,
          total.NonAktif,
          total.Lulus,
          total.UndurDiri,
          total.Meninggal,
          total.PindahProdi,
          total.Inbound,
          total.Outbound,
        ],
      },
    ];

    this.chartConfig1.xaxis = {
      categories: [
        "Aktif",
        "Cuti",
        "Non Aktif",
        "Lulus",
        "Undur Diri",
        "Meninggal",
        "Pindah Prodi",
        "Inbound",
        "Outbound",
      ],
    };

    return this.chartConfig1;
  }

  chart_B() {
    this.chartConfig2.series = [
      { name: "Jumlah Mahasiswa Aktif", data: [5, 8, 10, 13, 18] },
    ];

    this.chartConfig2.xaxis = {
      categories: ["2018", "2019", "2020", "2021", "2022"],
    };

    return this.chartConfig2;
  }

  chart_C() {
    this.chartConfig3.series = [
      { name: "Mahasiswa Aktif", data: [44, 55, 57, 56, 61] },
      { name: "Peserta Didik Baru", data: [76, 85, 101, 98, 87] },
      { name: "Mahasiswa Pindahan", data: [66, 75, 91, 88, 77] },
      { name: "Alih Program", data: [66, 75, 91, 78, 77] },
    ];

    this.chartConfig3.xaxis = {
      categories: ["2020-2", "2021-1", "2021-2", "2022-1", "2022-2"],
    };

    return this.chartConfig3;
  }
}
