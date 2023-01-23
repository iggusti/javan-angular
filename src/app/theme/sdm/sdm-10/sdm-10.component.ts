import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sdm-10",
  templateUrl: "./sdm-10.component.html",
  styleUrls: ["./sdm-10.component.scss"],
})
export class SDM10Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public listDataDN: Array<any> = [];
  public listDataLN: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 400, type: "donut" },
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
    title: { align: "center", text: "Tridharma Dalam Negeri" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Dosen" },
    },
  };

  public chartConfig2 = {
    chart: { height: 400, type: "donut" },
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
    title: { align: "center", text: "Tridharma Luar Negeri" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Dosen" },
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
          if (val.event_id === "E-010") {
            this.listData = val.data;
            this.listDataDN = val.total_moa_ia_dn;
            this.listDataLN = val.total_moa_ia_ln;
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
    this.chartConfig1.labels = [
      "Pendidikan dan Pengajaran",
      "Penelitian dan Pengembangan",
      "Pengabdian Kepada Masyarakat",
    ];

    this.chartConfig1.series = [
      this.listDataDN["Pendidikan dan Pengajaran"],
      this.listDataDN["Penelitian dan Pengembangan"],
      this.listDataDN["Pengabdian Kepada Masyarakat"],
    ];

    return this.chartConfig1;
  }

  public chart_B() {
    this.chartConfig2.labels = [
      "Pendidikan dan Pengajaran",
      "Penelitian dan Pengembangan",
      "Pengabdian Kepada Masyarakat",
    ];

    this.chartConfig2.series = [
      this.listDataLN["Pendidikan dan Pengajaran"],
      this.listDataLN["Penelitian dan Pengembangan"],
      this.listDataLN["Pengabdian Kepada Masyarakat"],
    ];

    return this.chartConfig2;
  }
}
