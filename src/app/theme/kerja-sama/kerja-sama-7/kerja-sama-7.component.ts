import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kerja-sama-7",
  templateUrl: "./kerja-sama-7.component.html",
  styleUrls: ["./kerja-sama-7.component.scss"],
})
export class KerjaSama7Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 400, type: "polarArea" },
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
    title: {
      align: "center",
      text: "Jumlah Peserta Internasional Summer Course",
    },
  };
  public chartConfig2 = {
    chart: { height: 400, type: "polarArea" },
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
    title: {
      align: "center",
      text: "Jumlah Peserta per Wilayah",
    },
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

    this.appService.getFakeDataKerjaSama().subscribe(
      (response) => {
        for (const val of response) {
          if (val.event_id === "E-007") {
            this.listData = val.data;
            this.chart_A();
            this.chart_B();
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
    const dataKegiatan: string[] = [];
    const dataAkumulasi: number[] = [];
    for (const item of this.listData) {
      dataKegiatan.push(item.summer_course_event);
      dataAkumulasi.push(item.accumulated_summer_course);
    }

    this.chartConfig1.labels = dataKegiatan;

    this.chartConfig1.series = dataAkumulasi;

    return this.chartConfig1;
  }

  public chart_B() {
    this.chartConfig2.labels = [
      "Asia",
      "Afrika",
      "Eropa",
      "Amerika Utara",
      "Amerika Selatan",
      "Australia",
    ];

    this.chartConfig2.series = [29, 11, 30, 27, 27, 17];

    return this.chartConfig2;
  }
}
