import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { DataTableDirective } from "angular-datatables";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public spinnerLoading: boolean;
  public dtTrigger = new Subject();
  public loadCard: boolean = false;
  public loadingForm: boolean = false;
  public listUsers = [];

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
        distributed: true,
        endingShape: "rounded",
        // horizontal: false,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    series: [],
    stroke: { show: true, width: 2, colors: ["transparent"] },
    title: { text: "Jumlah Musik yang Disukai Setiap User", align: "center" },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + " User";
        },
      },
    },
    xaxis: {},
    yaxis: { title: { text: "Jumlah User" } },
  };
  public chartConfig2 = {
    chart: { height: 400, type: "pie" },
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
      text: "Jumlah Gender User",
    },
  };

  constructor(
    private broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    private appService: AppService
  ) {
    translateService.setDefaultLang(localStorage.getItem("lang"));
    broadcasterService.changeLangBroadcast$.subscribe((res) => {
      translateService.setDefaultLang(res.lang);
    });

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      processing: true,
      destroy: true,
      // dom: "Blfrtip",
      lengthMenu: [10, 25, 50, 100],
      scrollX: "100%",
      scrollXInner: "100%",
      buttons: [
        {
          extend: "copy",
          exportOptions: {
            columns: [0, 1, 2],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2],
          },
        },
        {
          extend: "excel",
          exportOptions: {
            columns: [0, 1, 2],
          },
          customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets["sheet1.xml"];
            $("row[r!=1][r!=2] c", sheet).attr("s", "50");
          },
        },
        {
          extend: "csv",
          exportOptions: {
            columns: [0, 1, 2],
          },
        },
      ],
      language: {
        info: "Show _START_ to _END_ from _TOTAL_ data",
        zeroRecords: "<img src='assets/images/no-data-found.png'>",
        emptyTable: "<img src='assets/images/no-data-found.png'>",
        lengthMenu: "Show _MENU_ data",
        processing: "<img src='assets/images/loading.gif'>",
        infoFiltered: "",
        infoEmpty: "",
      },
      initComplete: () => {},
    };
  }

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers(): void {
    this.spinnerLoading = true;
    this.listUsers = [];

    this.appService.getListUsers().subscribe(
      (response) => {
        this.listUsers = response;

        for (let i = 0; i < this.listUsers.length; i++) {
          this.listUsers[i].sex_update =
            this.listUsers[i].sex === "male" ? "Male ♂️" : "Female ♀️";
          this.listUsers[i].birth_date_update = this.listUsers[
            i
          ].birth_date.slice(0, 10);
        }

        this.graphBar(this.listUsers);
        this.graphPie(this.listUsers);

        this.dtTrigger.next(); // Trigger for load datatable
        this.spinnerLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  graphBar(listUser) {
    let listMusic: string[] = [];
    for (let i = 0; i < listUser.length; i++) {
      listMusic.push(listUser[i].music);
    }
    let union = [...new Set([...listMusic])];
    let unionValue: number[] = [];
    for (let i = 0; i < union.length; i++) {
      let valueItem = listMusic.filter((x) => x == union[i]).length;
      unionValue.push(valueItem);
    }

    this.chartConfig1.series = [
      {
        name: "Jumlah User",
        data: unionValue,
      },
    ];

    this.chartConfig1.xaxis = {
      categories: union,
    };

    return this.chartConfig1;
  }

  graphPie(listUser) {
    let listSex: string[] = [];
    for (let i = 0; i < listUser.length; i++) {
      listSex.push(listUser[i].sex_update);
    }
    let union = [...new Set([...listSex])];
    let unionValue: number[] = [];
    for (let i = 0; i < union.length; i++) {
      let valueItem = listSex.filter((x) => x == union[i]).length;
      unionValue.push(valueItem);
    }

    this.chartConfig2.series = unionValue;

    this.chartConfig2.labels = union;

    return this.chartConfig2;
  }

  deleteUser(id) {
    Swal.fire({
      title: "Delete",
      text: "Hapus User?",
      type: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.appService.deleteUser(id).subscribe(
          (response) => {
            this.getListUsers();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  messageSuccess(message: string): void {
    this.broadcasterService.notifBroadcast(true, {
      title: "Success",
      msg: message,
      timeout: 5000,
      theme: "default",
      position: "top-right",
      type: "success",
    });
  }
}
