import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kerja-sama-5",
  templateUrl: "./kerja-sama-5.component.html",
  styleUrls: ["./kerja-sama-5.component.scss"],
})
export class KerjaSama5Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig = {
    chart: { height: 500, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { position: "top", horizontalAlign: "right", offsetX: 40 },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { width: 1, colors: ["#fff"] },
    title: {
      text: "Jumlah Perolehan Dana Kerja Sama Nasional Dalam Milyar Rupiah",
      align: "center",
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Milyar Rupiah" },
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
          if (val.event_id === "E-005") {
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

  public chart() {
    const dataProdi: string[] = [];
    const dataAcademics: number[] = [];
    const dataBusiness: number[] = [];
    const dataGoverment: number[] = [];
    const dataCommunity: number[] = [];
    const dataMedia: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataAcademics.push(item.contract_value.academics);
      dataBusiness.push(item.contract_value.business);
      dataGoverment.push(item.contract_value.government);
      dataCommunity.push(item.contract_value.community);
      dataMedia.push(item.contract_value.media);
    }

    this.chartConfig.series = [
      {
        name: "Academics",
        data: dataAcademics,
      },
      {
        name: "Business",
        data: dataBusiness,
      },
      {
        name: "Goverment",
        data: dataGoverment,
      },
      {
        name: "Community",
        data: dataCommunity,
      },
      {
        name: "Media",
        data: dataMedia,
      },
    ];

    this.chartConfig.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig;
  }
}
