import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sdm-1",
  templateUrl: "./sdm-1.component.html",
  styleUrls: ["./sdm-1.component.scss"],
})
export class SDM1Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig = {
    chart: {
      // events: {
      //   dataPointSelection: function (event, chartContext, config) {
      //     // ...
      //     alert(
      //       "data ke " +
      //         config.dataPointIndex +
      //         ", array ke " +
      //         config.seriesIndex
      //     );
      //   },
      // },
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
      text: "Pemberian reward Program Studi penerima anugerah kerja sama terbaik",
      align: "center",
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Kerja Sama" },
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

    this.appService.getFakeDataKerjaSama().subscribe(
      (response) => {
        for (const val of response) {
          if (val.event_id === "E-001") {
            this.listData = val.data;
            this.chart();
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

  chart() {
    const dataProdi: string[] = [];
    const dataMoU: number[] = [];
    const dataMoA: number[] = [];
    const dataIA: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataMoU.push(item.dn_cooperation.mou);
      dataMoA.push(item.dn_cooperation.moa);
      dataIA.push(item.dn_cooperation.ia);
    }

    this.chartConfig.series = [
      {
        name: "MoU",
        data: dataMoU,
      },
      {
        name: "MoA",
        data: dataMoA,
      },
      {
        name: "IA",
        data: dataIA,
      },
    ];

    this.chartConfig.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig;
  }
}
