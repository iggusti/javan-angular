import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-5",
  templateUrl: "./akademik-5.component.html",
  styleUrls: ["./akademik-5.component.scss"],
})
export class Akademik5Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
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
      text: "Rekapitulasi Penerimaan Mahasiswa Baru Program Studi ...",
      align: "center",
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
    yaxis: { title: { text: "Rekapitulasi Jumlah Mahasiswa" } },
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
          if (val.academic_id === "ACA-005") {
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
    this.chartConfig1.series = [
      { name: "Target Mahasiswa Baru", data: [44, 55, 57, 56, 61] },
      { name: "Pendaftar Ikut Seleksi", data: [76, 85, 101, 98, 87] },
      { name: "Pendaftar Lulus Seleksi", data: [66, 75, 91, 88, 77] },
      { name: "Daftar Ulang", data: [66, 75, 91, 78, 77] },
      { name: "Mengundurkan Diri", data: [6, 5, 1, 8, 7] },
    ];

    this.chartConfig1.xaxis = {
      categories: ["2018", "2019", "2020", "2021", "2022"],
    };
  }
}
