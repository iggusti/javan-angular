import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-4",
  templateUrl: "./akademik-4.component.html",
  styleUrls: ["./akademik-4.component.scss"],
})
export class Akademik4Component implements OnInit {
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
      text: "Rekapitulasi Penerimaan Mahasiswa Baru - Akumulasi",
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

  public total2019: any = {
    target_new_student: 0,
    following_selection: 0,
    pass_selection: 0,
    re_registration: 0,
    resign: 0,
  };
  public total2020: any = {
    target_new_student: 0,
    following_selection: 0,
    pass_selection: 0,
    re_registration: 0,
    resign: 0,
  };
  public total2021: any = {
    target_new_student: 0,
    following_selection: 0,
    pass_selection: 0,
    re_registration: 0,
    resign: 0,
  };
  public total2022: any = {
    target_new_student: 0,
    following_selection: 0,
    pass_selection: 0,
    re_registration: 0,
    resign: 0,
  };
  public total2023: any = {
    target_new_student: 0,
    following_selection: 0,
    pass_selection: 0,
    re_registration: 0,
    resign: 0,
  };

  GetListData(): void {
    this.spinnerLoading = true;
    this.listData = [];

    this.appService.getFakeDataAkademik().subscribe(
      (response) => {
        for (const val of response) {
          if (val.academic_id === "ACA-004") {
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
    let total2019: any = {
      target_new_student: 0,
      following_selection: 0,
      pass_selection: 0,
      re_registration: 0,
      resign: 0,
    };
    let total2020: any = {
      target_new_student: 0,
      following_selection: 0,
      pass_selection: 0,
      re_registration: 0,
      resign: 0,
    };
    let total2021: any = {
      target_new_student: 0,
      following_selection: 0,
      pass_selection: 0,
      re_registration: 0,
      resign: 0,
    };
    let total2022: any = {
      target_new_student: 0,
      following_selection: 0,
      pass_selection: 0,
      re_registration: 0,
      resign: 0,
    };
    let total2023: any = {
      target_new_student: 0,
      following_selection: 0,
      pass_selection: 0,
      re_registration: 0,
      resign: 0,
    };

    total2023.target_new_student = this.listData[0].target_new_student;
    total2022.target_new_student = this.listData[1].target_new_student;
    total2021.target_new_student = this.listData[2].target_new_student;
    total2020.target_new_student = this.listData[3].target_new_student;
    total2019.target_new_student = this.listData[4].target_new_student;

    for (let i = 0; i < this.listData[0].registration_path.length; i++) {
      total2023.following_selection +=
        this.listData[0].registration_path[i].following_selection;
      total2023.pass_selection +=
        this.listData[0].registration_path[i].pass_selection;
      total2023.re_registration +=
        this.listData[0].registration_path[i].re_registration;
      total2023.resign += this.listData[0].registration_path[i].resign;
    }
    for (let i = 0; i < this.listData[1].registration_path.length; i++) {
      total2022.following_selection +=
        this.listData[1].registration_path[i].following_selection;
      total2022.pass_selection +=
        this.listData[1].registration_path[i].pass_selection;
      total2022.re_registration +=
        this.listData[1].registration_path[i].re_registration;
      total2022.resign += this.listData[1].registration_path[i].resign;
    }
    for (let i = 0; i < this.listData[2].registration_path.length; i++) {
      total2021.following_selection +=
        this.listData[2].registration_path[i].following_selection;
      total2021.pass_selection +=
        this.listData[2].registration_path[i].pass_selection;
      total2021.re_registration +=
        this.listData[2].registration_path[i].re_registration;
      total2021.resign += this.listData[2].registration_path[i].resign;
    }
    for (let i = 0; i < this.listData[3].registration_path.length; i++) {
      total2020.following_selection +=
        this.listData[3].registration_path[i].following_selection;
      total2020.pass_selection +=
        this.listData[3].registration_path[i].pass_selection;
      total2020.re_registration +=
        this.listData[3].registration_path[i].re_registration;
      total2020.resign += this.listData[3].registration_path[i].resign;
    }
    for (let i = 0; i < this.listData[4].registration_path.length; i++) {
      total2019.following_selection +=
        this.listData[4].registration_path[i].following_selection;
      total2019.pass_selection +=
        this.listData[4].registration_path[i].pass_selection;
      total2019.re_registration +=
        this.listData[4].registration_path[i].re_registration;
      total2019.resign += this.listData[4].registration_path[i].resign;
    }

    this.chartConfig1.series = [
      {
        name: "Target Mahasiswa Baru",
        data: [
          total2019.target_new_student,
          total2020.target_new_student,
          total2021.target_new_student,
          total2022.target_new_student,
          total2023.target_new_student,
        ],
      },
      {
        name: "Pendaftar Ikut Seleksi",
        data: [
          total2019.following_selection,
          total2020.following_selection,
          total2021.following_selection,
          total2022.following_selection,
          total2023.following_selection,
        ],
      },
      {
        name: "Pendaftar Lulus Seleksi",
        data: [
          total2019.pass_selection,
          total2020.pass_selection,
          total2021.pass_selection,
          total2022.pass_selection,
          total2023.pass_selection,
        ],
      },
      {
        name: "Daftar Ulang",
        data: [
          total2019.re_registration,
          total2020.re_registration,
          total2021.re_registration,
          total2022.re_registration,
          total2023.re_registration,
        ],
      },
      {
        name: "Mengundurkan Diri",
        data: [
          total2019.resign,
          total2020.resign,
          total2021.resign,
          total2022.resign,
          total2023.resign,
        ],
      },
    ];

    this.chartConfig1.xaxis = {
      categories: ["2019", "2020", "2021", "2022", "2023"],
    };

    return this.chartConfig1;
  }
}
