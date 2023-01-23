import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-6",
  templateUrl: "./akademik-6.component.html",
  styleUrls: ["./akademik-6.component.scss"],
})
export class Akademik6Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: {
      height: 500,
      type: "bar",
      stacked: true,
    },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { position: "top", horizontalAlign: "right", offsetX: 40 },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { width: 1, colors: ["#fff"] },
    title: {
      text: "Status Registrasi",
      align: "center",
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
    },
    xaxis: {},
  };
  public chartConfig2 = {
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
    title: { align: "center", text: "Status Pembayaran" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
    },
  };
  public chartConfig3 = {
    chart: {
      height: 500,
      type: "bar",
      stacked: true,
    },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { position: "top", horizontalAlign: "right", offsetX: 40 },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { width: 1, colors: ["#fff"] },
    title: {
      text: "Asal Pembiayaan",
      align: "center",
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
    },
    xaxis: {},
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
    this.listData = [];

    this.appService.getFakeDataAkademik().subscribe(
      (response) => {
        for (const val of response) {
          if (val.academic_id === "ACA-006") {
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

  public chart_A() {
    const dataProdi: string[] = [];
    const dataRegistrasi: number[] = [];
    const dataTidakRegistrasi: number[] = [];
    const dataCuti: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataRegistrasi.push(item.registration_status.registration);
      dataTidakRegistrasi.push(item.registration_status.not_register);
      dataCuti.push(item.registration_status.cuti);
    }

    this.chartConfig1.series = [
      {
        name: "Registrasi",
        data: dataRegistrasi,
      },
      {
        name: "Tidak Registrasi",
        data: dataTidakRegistrasi,
      },
      {
        name: "Cuti",
        data: dataCuti,
      },
    ];

    this.chartConfig1.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig1;
  }

  public chart_B() {
    let total: any = {
      Lunas: 0,
      BelumLunas: 0,
      Tunggakan: 0,
    };
    for (let i = 0; i < this.listData.length; i++) {
      total.Lunas += this.listData[i].payment_status.paid_off;
      total.BelumLunas += this.listData[i].payment_status.not_yet_paid_off;
      total.Tunggakan += this.listData[i].payment_status.arrears;
    }

    this.chartConfig2.series = [total.Lunas, total.BelumLunas, total.Tunggakan];

    this.chartConfig2.labels = ["Lunas", "Belum Lunas", "Tunggakan"];

    return this.chartConfig2;
  }

  public chart_C() {
    const dataProdi: string[] = [];
    const dataMandiri: number[] = [];
    const dataBeasiswaPenuh: number[] = [];
    const dataBeasiswaTidakPenuh: number[] = [];
    const dataBidikMisi: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataMandiri.push(item.funding_source.independent);
      dataBeasiswaPenuh.push(item.funding_source.full_scholarship);
      dataBeasiswaTidakPenuh.push(item.funding_source.non_full_scholarship);
      dataBidikMisi.push(item.funding_source.aim_mission);
    }

    this.chartConfig3.series = [
      {
        name: "Mandiri",
        data: dataMandiri,
      },
      {
        name: "Beasiswa Penuh",
        data: dataBeasiswaPenuh,
      },
      {
        name: "Beasiswa Tidak Penuh",
        data: dataBeasiswaTidakPenuh,
      },
      {
        name: "Bidik Misi",
        data: dataBidikMisi,
      },
    ];

    this.chartConfig3.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig3;
  }
}
