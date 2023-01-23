import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-8",
  templateUrl: "./akademik-8.component.html",
  styleUrls: ["./akademik-8.component.scss"],
})
export class Akademik8Component implements OnInit {
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
    title: { align: "center", text: "Demografi Berdasarkan Gender" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
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
    title: {
      align: "center",
      text: "Demogradi Berdasarkan Pekerjaan Orang Tua",
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
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

    this.appService.getFakeDataAkademik().subscribe(
      (response) => {
        for (const val of response) {
          if (val.academic_id === "ACA-008") {
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
    let total: any = {
      male: 0,
      female: 0,
    };
    for (let i = 0; i < this.listData.length; i++) {
      total.male += this.listData[i].gender.male;
      total.female += this.listData[i].gender.female;
    }

    this.chartConfig1.series = [total.male, total.female];

    this.chartConfig1.labels = ["Laki-laki", "Perempuan"];

    return this.chartConfig1;
  }

  public chart_B() {
    let total: any = {
      farmer: 0,
      pns: 0,
      lecturer: 0,
      doctor: 0,
      politikus: 0,
      enterpreneur: 0,
      private_employees: 0,
      laborer: 0,
      artist: 0,
      others: 0,
    };
    for (let i = 0; i < this.listData.length; i++) {
      total.farmer += this.listData[i].parent_job.farmer;
      total.pns += this.listData[i].parent_job.pns;
      total.lecturer += this.listData[i].parent_job.lecturer;
      total.doctor += this.listData[i].parent_job.doctor;
      total.politikus += this.listData[i].parent_job.politikus;
      total.enterpreneur += this.listData[i].parent_job.enterpreneur;
      total.private_employees += this.listData[i].parent_job.private_employees;
      total.laborer += this.listData[i].parent_job.laborer;
      total.artist += this.listData[i].parent_job.artist;
      total.others += this.listData[i].parent_job.others;
    }

    this.chartConfig2.series = [
      total.farmer,
      total.pns,
      total.lecturer,
      total.doctor,
      total.politikus,
      total.enterpreneur,
      total.private_employees,
      total.laborer,
      total.artist,
      total.others,
    ];

    this.chartConfig2.labels = [
      "Petani / Peternak",
      "PNS / ASN",
      "Guru / Dosen",
      "Dokter",
      "Politikus",
      "Pedagang / Wiraswasta",
      "Pegawai Swasta",
      "Buruh",
      "Seni / Lukis / Artis / Sejenisnya",
      "Lain-lain",
    ];

    return this.chartConfig2;
  }
}
