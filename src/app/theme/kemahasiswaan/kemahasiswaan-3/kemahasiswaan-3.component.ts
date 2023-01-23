import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kemahasiswaan-3",
  templateUrl: "./kemahasiswaan-3.component.html",
  styleUrls: ["./kemahasiswaan-3.component.scss"],
})
export class Kemahasiswaan3Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 600, stacked: true, type: "bar" },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return "Rp. " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
    },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Jumlah Penerimaan per Fakultas" },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) =>
          "Rp. " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      },
    },
    xaxis: {},
  };
  public chartConfig2 = {
    chart: { height: 600, stacked: true, type: "bar" },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Jumlah Mahasiswa Penerima Beasiswa" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
    },
    xaxis: {},
  };
  public chartConfig3 = {
    chart: { height: 350, type: "bar" },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#304758"] },
    },
    fill: { opacity: 1 },
    plotOptions: {
      bar: {
        borderRadius: 5,
        // columnWidth: "55%",
        // distributed: true,
        endingShape: "rounded",
        // horizontal: false,
        dataLabels: { position: "top" },
      },
    },
    series: [],
    stroke: { colors: ["transparent"], show: true, width: 2 },
    title: { align: "center", text: "Jumlah Penerimaan per Tahun" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => "Rp. " + val + " Milyar Rupiah" },
    },
    xaxis: {},
    yaxis: { title: { text: "Jumlah Penerimaan" } },
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
          if (val.students_id === "STD-003") {
            this.listData = val.data;
            for (let i = 0; i < this.listData.length; i++) {
              this.listData[i].bea_internal = this.listData[
                i
              ].internal_scholarship
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              this.listData[i].bea_eksternal = this.listData[
                i
              ].external_scholarship
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
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
    const dataFakultas: string[] = [];
    const dataBeasiswaInternal: number[] = [];
    const dataBeasiswaEksternal: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataBeasiswaInternal.push(item.internal_scholarship);
      dataBeasiswaEksternal.push(item.external_scholarship);
    }

    this.chartConfig1.series = [
      { name: "Beasiswa Internal", data: dataBeasiswaInternal },
      { name: "Beasiswa Eksternal", data: dataBeasiswaEksternal },
    ];

    this.chartConfig1.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig1;
  }

  chart_B() {
    const dataFakultas: string[] = [];
    const dataBeasiswaInternal: number[] = [];
    const dataBeasiswaEksternal: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataBeasiswaInternal.push(item.internal_scholarship_student);
      dataBeasiswaEksternal.push(item.external_scholarship_student);
    }

    this.chartConfig2.series = [
      { name: "Beasiswa Internal", data: dataBeasiswaInternal },
      { name: "Beasiswa Eksternal", data: dataBeasiswaEksternal },
    ];

    this.chartConfig2.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig2;
  }

  chart_C() {
    this.chartConfig3.series = [
      { name: "Beasiswa Internal", data: [44, 55, 57, 56, 61] },
      { name: "Beasiswa Eksternal", data: [76, 85, 101, 98, 87] },
    ];

    this.chartConfig3.xaxis = {
      categories: ["2018", "2019", "2020", "2021", "2022"],
    };

    return this.chartConfig3;
  }
}
