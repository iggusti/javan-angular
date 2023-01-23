import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-akademik-7",
  templateUrl: "./akademik-7.component.html",
  styleUrls: ["./akademik-7.component.scss"],
})
export class Akademik7Component implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public listData: Array<any> = [];
  public spinnerLoading: boolean;

  public chartConfig1 = {
    chart: {
      height: 500,
      type: "bar",
      stacked: true,
    },
    dataLabels: { enabled: true },
    fill: { opacity: 1 },
    legend: { position: "top", horizontalAlign: "right", offsetX: 40 },
    plotOptions: { bar: { horizontal: true } },
    series: [],
    stroke: { width: 1, colors: ["#fff"] },
    title: {
      text: "Demogfrafi Berdasarkan Kewarganegaraan",
      align: "center",
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + " Mahasiswa" },
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

    this.appService.getFakeDataAkademik().subscribe(
      (response) => {
        for (const val of response) {
          if (val.academic_id === "ACA-007") {
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
    const dataProdi: string[] = [];
    const dataIndonesia: number[] = [];
    const dataBrunei: number[] = [];
    const dataMalaysia: number[] = [];
    const dataKamboja: number[] = [];
    const dataLaos: number[] = [];
    const dataMyanmar: number[] = [];
    const dataFilipina: number[] = [];
    const dataSingapura: number[] = [];
    const dataThailand: number[] = [];
    const dataVietnam: number[] = [];
    const dataLainnya: number[] = [];
    for (const item of this.listData) {
      dataProdi.push(item.study_program);
      dataIndonesia.push(item.cityzenship.indonesia);
      dataBrunei.push(item.cityzenship.brunei);
      dataMalaysia.push(item.cityzenship.malaysia);
      dataKamboja.push(item.cityzenship.kamboja);
      dataLaos.push(item.cityzenship.laos);
      dataMyanmar.push(item.cityzenship.myanmar);
      dataFilipina.push(item.cityzenship.filipina);
      dataSingapura.push(item.cityzenship.singapura);
      dataThailand.push(item.cityzenship.thailand);
      dataVietnam.push(item.cityzenship.vietnam);
      dataLainnya.push(item.cityzenship.other);
    }

    this.chartConfig1.series = [
      {
        name: "Indonesia",
        data: dataIndonesia,
      },
      {
        name: "Brunei",
        data: dataBrunei,
      },
      {
        name: "Malaysia",
        data: dataMalaysia,
      },
      {
        name: "Kamboja",
        data: dataKamboja,
      },
      {
        name: "Laos",
        data: dataLaos,
      },
      {
        name: "Myanmar",
        data: dataMyanmar,
      },
      {
        name: "Filipina",
        data: dataFilipina,
      },
      {
        name: "Singapura",
        data: dataSingapura,
      },
      {
        name: "Thailand",
        data: dataThailand,
      },
      {
        name: "Vietnam",
        data: dataVietnam,
      },
      {
        name: "Lainnya",
        data: dataLainnya,
      },
    ];

    this.chartConfig1.xaxis = {
      categories: dataProdi,
    };

    return this.chartConfig1;
  }
}
