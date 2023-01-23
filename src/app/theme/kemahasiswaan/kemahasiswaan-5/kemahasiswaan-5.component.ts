import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-kemahasiswaan-5",
  templateUrl: "./kemahasiswaan-5.component.html",
  styleUrls: ["./kemahasiswaan-5.component.scss"],
})
export class Kemahasiswaan5Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    series: [],
    chart: { height: 600, type: "line", zoom: { enabled: false } },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    dataLabels: { enabled: true },
    stroke: { curve: "straight" },
    title: { text: "Rata-Rata Tingkat Kepuasan Perusahaan", align: "center" },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
      },
    },
    xaxis: {},
    yaxis: { title: { text: "Persentase Kepuasan" } },
  };
  public chartConfig2 = {
    chart: { height: 600, stacked: true, type: "bar" },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Jenis Perusahaan Responden" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Alumni" },
    },
    xaxis: {},
  };
  public chartConfig3 = {
    chart: { height: 600, stacked: true, type: "bar" },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { horizontalAlign: "right", offsetX: 40, position: "top" },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { colors: ["#fff"], width: 1 },
    title: { align: "center", text: "Jabatan Responden" },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Orang" },
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
          if (val.students_id === "STD-005") {
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

  public chart_A() {
    const dataSeries: any = [];
    for (const item of this.listData) {
      dataSeries.push({
        name: item.study_program,
        data: [
          item.average_company_satisfaction["2019"],
          item.average_company_satisfaction["2020"],
          item.average_company_satisfaction["2021"],
          item.average_company_satisfaction["2022"],
        ],
      });
    }

    this.chartConfig1.series = dataSeries;

    this.chartConfig1.xaxis = { categories: ["2019", "2020", "2021", "2022"] };

    return this.chartConfig1;
  }

  public chart_B() {
    const dataProdi: string[] = [];
    const dataGoverment: number[] = [];
    const dataSwasta: number[] = [];
    const dataOrgNonProfit: number[] = [];
    const dataBUMNBUMD: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataGoverment.push(item.company_type.government);
      dataSwasta.push(item.company_type.swasta);
      dataOrgNonProfit.push(item.company_type.non_profit_organization);
      dataBUMNBUMD.push(item.company_type.bumn);
    }

    this.chartConfig2.series = [
      { name: "Pemerintah", data: dataGoverment },
      { name: "Swasta", data: dataSwasta },
      { name: "Perusahaan Non Profit", data: dataOrgNonProfit },
      { name: "BUMN / BUMD", data: dataBUMNBUMD },
    ];

    this.chartConfig2.xaxis = { categories: dataProdi };

    return this.chartConfig2;
  }

  public chart_C() {
    const dataProdi: string[] = [];
    const dataDirektur: number[] = [];
    const dataManager: number[] = [];
    const dataAsistenManager: number[] = [];
    const dataSupervisor: number[] = [];
    const dataSeniorStaff: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataDirektur.push(item.respondent_position.direktur);
      dataManager.push(item.respondent_position.manajer);
      dataAsistenManager.push(item.respondent_position.asisten_manajer);
      dataSupervisor.push(item.respondent_position.supervisor);
      dataSeniorStaff.push(item.respondent_position.senior_staff);
    }

    this.chartConfig3.series = [
      { name: "Direktur", data: dataDirektur },
      { name: "Manager", data: dataManager },
      { name: "Asisten Manager", data: dataAsistenManager },
      { name: "Supervisor", data: dataSupervisor },
      { name: "Senior Staff", data: dataSeniorStaff },
    ];

    this.chartConfig3.xaxis = { categories: dataProdi };

    return this.chartConfig3;
  }
}
