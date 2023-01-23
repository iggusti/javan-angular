import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kerja-sama-12",
  templateUrl: "./kerja-sama-12.component.html",
  styleUrls: ["./kerja-sama-12.component.scss"],
})
export class KerjaSama12Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig = {
    chart: { height: 500, stacked: true, type: "bar" },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Dosen Pembina Mahasiswa Berprestasi" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Dosen" },
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
          if (val.event_id === "E-012") {
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
    const dataDosenTetap: number[] = [];
    const dataDosenPembina: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataDosenTetap.push(item.sum_permanent_lecturer);
      dataDosenPembina.push(item.sum_supervisor_lecturer);
    }

    this.chartConfig.series = [
      {
        name: "Dosen Tetap",
        data: dataDosenTetap,
      },
      {
        name: "Dosen Pembina",
        data: dataDosenPembina,
      },
    ];

    this.chartConfig.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig;
  }
}
