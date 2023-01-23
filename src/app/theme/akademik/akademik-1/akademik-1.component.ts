import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-1",
  templateUrl: "./akademik-1.component.html",
  styleUrls: ["./akademik-1.component.scss"],
})
export class Akademik1Component implements OnInit {
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
    title: { align: "center", text: "Status Akreditasi" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
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
      text: "Profil Akreditasi",
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

  public totalDiploma2: number = 0;
  public totalDiploma3: number = 0;
  public totalDiploma4: number = 0;
  public totalSarjanaS1: number = 0;
  public totalProfesi: number = 0;
  public totalMagisterS2: number = 0;
  public totalDoktorS3: number = 0;
  public totalSpesialis: number = 0;
  public totalProgram: number = 0;

  GetListData(): void {
    this.spinnerLoading = true;
    this.listData = [];

    this.appService.getFakeDataAkademik().subscribe(
      (response) => {
        for (const val of response) {
          if (val.academic_id === "ACA-001") {
            this.listData = val.data;
            for (let i = 0; i < this.listData.length; i++) {
              this.totalDiploma2 += this.listData[i].program[0].total;
              this.totalDiploma3 += this.listData[i].program[1].total;
              this.totalDiploma4 += this.listData[i].program[2].total;
              this.totalSarjanaS1 += this.listData[i].program[3].total;
              this.totalProfesi += this.listData[i].program[4].total;
              this.totalMagisterS2 += this.listData[i].program[5].total;
              this.totalDoktorS3 += this.listData[i].program[6].total;
              this.totalSpesialis += this.listData[i].program[7].total;
              this.totalProgram += this.listData[i].total_program;
            }
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

  chart_A() {
    const dataProgram: number[] = [];
    for (const item of this.listData) {
      dataProgram.push(item.total_program);
    }

    this.chartConfig1.series = dataProgram;

    this.chartConfig1.labels = [
      "Akreditasi A",
      "Akreditasi B",
      "Akreditasi C",
      "Kadaluarsa",
      "Belum Terakreditasi",
    ];

    return this.chartConfig1;
  }

  chart_B() {
    this.chartConfig2.series = [
      this.totalDiploma2,
      this.totalDiploma3,
      this.totalDiploma4,
      this.totalSarjanaS1,
      this.totalProfesi,
      this.totalMagisterS2,
      this.totalDoktorS3,
      this.totalSpesialis,
    ];

    this.chartConfig2.labels = [
      "Diploma 2",
      "Diploma 3",
      "Diploma 4",
      "Sarjana (S-1)",
      "Profesi",
      "Magister (S-2)",
      "Doktor (S-3)",
      "Spesialis",
    ];

    return this.chartConfig2;
  }
}
