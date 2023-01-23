import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-2",
  templateUrl: "./akademik-2.component.html",
  styleUrls: ["./akademik-2.component.scss"],
})
export class Akademik2Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 500, type: "treemap" },
    dataLabels: { enabled: true },
    legend: { show: true },
    plotOptions: { treemap: { distributed: true, enableShades: false } },
    series: [],
    title: { text: "Jumlah Kegiatan Tahun xxxx", align: "center" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Kegiatan" },
    },
  };
  public chartConfig2 = {
    chart: { height: 500, type: "treemap" },
    legend: { show: true },
    plotOptions: { treemap: { distributed: true, enableShades: false } },
    series: [],
    title: {
      text: "Jumlah Pendanaan Tahun xxxx",
      align: "center",
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) =>
          "Rp. " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      },
    },
  };
  public chartConfig3 = {
    chart: { height: 500, type: "bar" },
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
        distributed: true,
        endingShape: "rounded",
        // horizontal: false,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    series: [],
    stroke: { colors: ["transparent"], show: true, width: 2 },
    title: { text: "Penilaian Kinerja Tahun xxxx", align: "center" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val },
    },
    xaxis: {},
    yaxis: { title: { text: "Jumlah Penilaian Kerja" } },
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
          if (val.academic_id === "ACA-002") {
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
    const dataSeries: any = [];
    for (const item of this.listData) {
      dataSeries.push({ x: item.singkatan, y: item.event_count });
    }

    this.chartConfig1.series = [{ data: dataSeries }];

    return this.chartConfig1;
  }

  chart_B() {
    const dataSeries: any = [];
    for (const item of this.listData) {
      dataSeries.push({ x: item.singkatan, y: item.total_funding });
    }

    this.chartConfig2.series = [{ data: dataSeries }];

    return this.chartConfig2;
  }

  chart_C() {
    const dataKinerja: number[] = [];
    const dataOrmawa: string[] = [];
    for (const item of this.listData) {
      dataKinerja.push(item.performance_assessment);
      dataOrmawa.push(item.singkatan);
    }

    this.chartConfig3.series = [{ name: "Penilaian Kerja", data: dataKinerja }];

    this.chartConfig3.xaxis = { categories: dataOrmawa };

    return this.chartConfig3;
  }
}
