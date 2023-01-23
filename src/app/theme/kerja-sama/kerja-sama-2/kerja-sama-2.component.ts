import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kerja-sama-2",
  templateUrl: "./kerja-sama-2.component.html",
  styleUrls: ["./kerja-sama-2.component.scss"],
})
export class KerjaSama2Component implements OnInit {
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
      text: "Pemberian reward Program Studi yang melaksanakan kerja sama MBKM",
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
          if (val.event_id === "E-002") {
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
    const dataKKNTematik: number[] = [];
    const dataPertukaranPelajar: number[] = [];
    const dataMagang: number[] = [];
    const dataTeachingAssistance: number[] = [];
    const dataResearch: number[] = [];
    const dataHumanitarianProject: number[] = [];
    const dataEntrepreneurialActivity: number[] = [];
    const dataIndependentProject: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataKKNTematik.push(item.cooperation.kkn_tematik);
      dataPertukaranPelajar.push(item.cooperation.student_exchange);
      dataMagang.push(item.cooperation.internship);
      dataTeachingAssistance.push(item.cooperation.teaching_assistance);
      dataResearch.push(item.cooperation.research);
      dataHumanitarianProject.push(item.cooperation.humanitarian_project);
      dataEntrepreneurialActivity.push(
        item.cooperation.entrepreneurial_activity
      );
      dataIndependentProject.push(item.cooperation.independent_project);
    }

    this.chartConfig.series = [
      {
        name: "KKN Tematik",
        data: dataKKNTematik,
      },
      {
        name: "Pertukaran Pelajar",
        data: dataPertukaranPelajar,
      },
      {
        name: "Magang / Praktik Kerja",
        data: dataMagang,
      },
      {
        name: "Asistensi Mengajar",
        data: dataTeachingAssistance,
      },
      {
        name: "Penelitian / Riset",
        data: dataResearch,
      },
      {
        name: "Proyek Kemanusiaan",
        data: dataHumanitarianProject,
      },
      {
        name: "Kegiatan Wirausaha",
        data: dataEntrepreneurialActivity,
      },
      {
        name: "Studi / Proyek Independen",
        data: dataIndependentProject,
      },
    ];

    this.chartConfig.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig;
  }
}
