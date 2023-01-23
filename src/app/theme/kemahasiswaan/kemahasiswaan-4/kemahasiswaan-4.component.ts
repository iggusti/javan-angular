import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kemahasiswaan-4",
  templateUrl: "./kemahasiswaan-4.component.html",
  styleUrls: ["./kemahasiswaan-4.component.scss"],
})
export class Kemahasiswaan4Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: { height: 600, stacked: true, type: "bar" },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Kondisi Lulusan" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Alumni" },
    },
    xaxis: {},
  };
  public chartConfig2 = {
    chart: { height: 600, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Jenis Perusahaan Tempat Kerja" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Alumni";
        },
      },
    },
    xaxis: {},
  };
  public chartConfig3 = {
    chart: { height: 600, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Linieritas dengan Stakeholder" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Alumni";
        },
      },
    },
    xaxis: {},
  };
  public chartConfig4 = {
    chart: { height: 600, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Perguruan Tinggi Studi Lanjut" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Alumni";
        },
      },
    },
    xaxis: {},
  };
  public chartConfig5 = {
    chart: { height: 600, type: "bar", stacked: true },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: {
      bar: { borderRadius: 5, distributed: true, horizontal: true },
    },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Jumlah Alumni" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " Alumni";
        },
      },
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

    this.appService.getFakeDataKemahasiswaan().subscribe(
      (response) => {
        for (const val of response) {
          if (val.students_id === "STD-004") {
            this.listData = val.data;
            this.chart_A();
            this.chart_B();
            this.chart_C();
            this.chart_D();
            this.chart_E();
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
    const dataFakultas: string[] = [];
    const dataBekerja: number[] = [];
    const dataWiraswasta: number[] = [];
    const dataStudiLanjut: number[] = [];
    const dataBelumBekerja: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataBekerja.push(item.graduate_condition.working);
      dataWiraswasta.push(item.graduate_condition.entrepreneur);
      dataStudiLanjut.push(item.graduate_condition.continuing_study);
      dataBelumBekerja.push(item.graduate_condition.not_yet_working);
    }

    this.chartConfig1.series = [
      { name: "Bekerja", data: dataBekerja },
      { name: "Wiraswasta", data: dataWiraswasta },
      { name: "Melanjutkan Studi", data: dataStudiLanjut },
      { name: "Belum Bekerja", data: dataBelumBekerja },
    ];

    this.chartConfig1.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig1;
  }

  public chart_B() {
    const dataFakultas: string[] = [];
    const dataGoverment: number[] = [];
    const dataOrgNonProfit: number[] = [];
    const dataSwasta: number[] = [];
    const dataOwnCompany: number[] = [];
    const dataBUMNBUMD: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataGoverment.push(item.company_type.government);
      dataOrgNonProfit.push(item.company_type.non_profit_organization);
      dataSwasta.push(item.company_type.swasta);
      dataOwnCompany.push(item.company_type.own_company);
      dataBUMNBUMD.push(item.company_type.bumn);
    }

    this.chartConfig2.series = [
      { name: "Instansi Pemerintah", data: dataGoverment },
      { name: "Organisasi Non Profit", data: dataOrgNonProfit },
      { name: "Swasta", data: dataSwasta },
      { name: "Perusahaan Sendiri", data: dataOwnCompany },
      { name: "BUMN / BUMD", data: dataBUMNBUMD },
    ];

    this.chartConfig2.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig2;
  }

  public chart_C() {
    const dataFakultas: string[] = [];
    const dataSangatErat: number[] = [];
    const dataErat: number[] = [];
    const dataCukupErat: number[] = [];
    const dataKurangErat: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataSangatErat.push(item.linearity.very_tight);
      dataErat.push(item.linearity.tightly);
      dataCukupErat.push(item.linearity.enough_tight);
      dataKurangErat.push(item.linearity.less_tight);
    }

    this.chartConfig3.series = [
      { name: "Sangat Erat", data: dataSangatErat },
      { name: "Erat", data: dataErat },
      { name: "Cukup Erat", data: dataCukupErat },
      { name: "Kurang Erat", data: dataKurangErat },
    ];

    this.chartConfig3.xaxis = { categories: dataFakultas };

    return this.chartConfig3;
  }

  public chart_D() {
    const dataFakultas: string[] = [];
    const dataPTN: number[] = [];
    const dataPTS: number[] = [];
    const dataPTLN: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataPTN.push(item.graduate_pt.ptn);
      dataPTS.push(item.graduate_pt.pts);
      dataPTLN.push(item.graduate_pt.pt_ln);
    }

    this.chartConfig4.series = [
      {
        name: "PTN",
        data: dataPTN,
      },
      {
        name: "PTS",
        data: dataPTS,
      },
      {
        name: "PTLN",
        data: dataPTLN,
      },
    ];

    this.chartConfig4.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig4;
  }

  public chart_E() {
    const dataFakultas: string[] = [];
    const dataJumlahAlumni: number[] = [];
    for (const item of this.listData) {
      dataFakultas.push(item.faculty);
      dataJumlahAlumni.push(item.alumni_count);
    }

    this.chartConfig5.series = [
      {
        name: "Jumlah Alumni",
        data: dataJumlahAlumni,
      },
    ];

    this.chartConfig5.xaxis = {
      categories: dataFakultas,
    };

    return this.chartConfig5;
  }
}
