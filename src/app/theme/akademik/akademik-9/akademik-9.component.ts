import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-9",
  templateUrl: "./akademik-9.component.html",
  styleUrls: ["./akademik-9.component.scss"],
})
export class Akademik9Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: {
      height: 1000,
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
      text: "Demografi Berdasarkan Domisili",
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
          if (val.academic_id === "ACA-009") {
            this.listData = val.data;
            this.chart_A();
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
    const dataDomisili: string[] = [];
    const dataRegular: number[] = [];
    const dataPindahan: number[] = [];
    const dataIntern: number[] = [];
    const dataMBKM: number[] = [];
    for (const item of this.listData) {
      dataDomisili.push(item.domicile);
      dataRegular.push(item.student_type.regular);
      dataPindahan.push(item.student_type.pindahan);
      dataIntern.push(item.student_type.international);
      dataMBKM.push(item.student_type.mbkm);
    }

    this.chartConfig1.series = [
      {
        name: "Reguler",
        data: dataRegular,
      },
      {
        name: "Pindahan",
        data: dataPindahan,
      },
      {
        name: "Internasional",
        data: dataIntern,
      },
      {
        name: "MBKM",
        data: dataMBKM,
      },
    ];

    this.chartConfig1.xaxis = {
      categories: dataDomisili,
    };

    return this.chartConfig1;
  }
}
