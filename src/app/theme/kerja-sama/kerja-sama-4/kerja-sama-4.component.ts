import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kerja-sama-4",
  templateUrl: "./kerja-sama-4.component.html",
  styleUrls: ["./kerja-sama-4.component.scss"],
})
export class KerjaSama4Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 400, type: "donut" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    labels: [],
    legend: { show: true, position: "bottom" },
    plotOptions: {
      pie: {
        donut: {
          labels: { show: true, name: { show: true }, value: { show: true } },
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
    title: { text: "Kerja Sama Dalam Negeri", align: "center" },
  };
  public chartConfig2 = {
    chart: { height: 400, type: "donut" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    labels: [],
    legend: { show: true, position: "bottom" },
    plotOptions: {
      pie: {
        donut: {
          labels: { show: true, name: { show: true }, value: { show: true } },
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
    title: { text: "Kerja Sama Luar Negeri", align: "center" },
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
          if (val.event_id === "E-004") {
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
    const dataJenisMitra: string[] = [];
    const dataDN: number[] = [];
    for (const item of this.listData) {
      dataJenisMitra.push(item.partner_type);
      dataDN.push(item.dn);
    }

    this.chartConfig1.labels = dataJenisMitra;

    this.chartConfig1.series = dataDN;

    return this.chartConfig1;
  }

  public chart_B() {
    const dataJenisMitra: string[] = [];
    const dataLN: number[] = [];
    for (const item of this.listData) {
      dataJenisMitra.push(item.partner_type);
      dataLN.push(item.ln);
    }

    this.chartConfig2.labels = dataJenisMitra;

    this.chartConfig2.series = dataLN;

    return this.chartConfig2;
  }
}
