import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kemahasiswaan-1",
  templateUrl: "./kemahasiswaan-1.component.html",
  styleUrls: ["./kemahasiswaan-1.component.scss"],
})
export class Kemahasiswaan1Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 600, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    plotOptions: { bar: { horizontal: true } },
    stroke: { width: 1, colors: ["#fff"] },
    title: { text: "Prestasi Mahasiswa dalam Kompetisi", align: "center" },
    series: [],
    xaxis: {},
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Prestasi" },
    },
    fill: { opacity: 1 },
    legend: { position: "top", horizontalAlign: "right", offsetX: 40 },
  };
  public chartConfig2 = {
    series: [],
    chart: { height: 500, type: "line", zoom: { enabled: false } },
    dataLabels: { enabled: true },
    stroke: { curve: "straight" },
    title: { text: "Prestasi Kompetisi Kemendikbudristek", align: "center" },
    grid: { row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 } },
    xaxis: {},
    yaxis: { title: { text: "Jumlah Prestasi" } },
  };
  public chartConfig3 = {
    chart: { height: 500, type: "line", zoom: { enabled: false } },
    dataLabels: { enabled: true },
    grid: { row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 } },
    series: [],
    stroke: { curve: "straight" },
    title: { text: "Prestasi Kompetisi Mandiri", align: "center" },
    xaxis: {},
    yaxis: { title: { text: "Jumlah Prestasi" } },
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

    this.appService.getFakeDataKemahasiswaan().subscribe(
      (response) => {
        for (const val of response) {
          if (val.students_id === "STD-001") {
            this.listData = val.data;
            this.chart_A();
            this.chart_B();
            this.chart_C();
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
    const dataProdi: string[] = [];
    const dataKomKemendikbudristek: number[] = [];
    const dataKomMandiri: number[] = [];
    const dataMhsTerlibat: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataKomKemendikbudristek.push(item.kemendikbudristek_competitions_count);
      dataKomMandiri.push(item.independent_competitions_count);
      dataMhsTerlibat.push(item.student_involvement_count);
    }

    this.chartConfig1.series = [
      { name: "Kompetisi Kemendikbudristek", data: dataKomKemendikbudristek },
      { name: "Kompetisi Mandiri", data: dataKomMandiri },
    ];

    this.chartConfig1.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig1;
  }

  chart_B() {
    this.chartConfig2.series = [
      { name: "Jumlah Prestasi", data: [5, 8, 10, 13, 18] },
    ];

    this.chartConfig2.xaxis = {
      categories: ["2018", "2019", "2020", "2021", "2022"],
    };

    return this.chartConfig2;
  }

  chart_C() {
    this.chartConfig3.series = [
      { name: "Jumlah Prestasi", data: [7, 11, 12, 20, 22] },
    ];

    this.chartConfig3.xaxis = {
      categories: ["2018", "2019", "2020", "2021", "2022"],
    };

    return this.chartConfig3;
  }
}
