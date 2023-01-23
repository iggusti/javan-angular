import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AppService } from "src/app/_services/app.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sample",
  templateUrl: "./sample.component.html",
  styleUrls: ["./sample.component.scss"],
})
export class SampleComponent implements OnInit {
  public loadCard: boolean;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public spinnerLoading: boolean;

  public listColumn: Array<any> = [];
  public listData: Array<any> = [];

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
    this.spinnerLoading = true;

    setTimeout(() => {
      this.listColumn = [["position", "name", "weight", "symbol"]];
      this.listData = [
        [1, "Hydrogen", 1.0079, "H"],
        [2, "Helium", 4.0026, "He"],
        [3, "Lithium", 6.941, "Li"],
        [4, "Beryllium", 9.0122, "Be"],
        [5, "Boron", 10.811, "B"],
        [6, "Carbon", 12.0107, "C"],
        [7, "Nitrogen", 14.0067, "N"],
        [8, "Oxygen", 15.9994, "O"],
        [9, "Fluorine", 18.9984, "F"],
        [10, "Neon", 20.1797, "Ne"],
        [11, "Neon", 20.1797, "Ne"],
      ];
      this.dtTrigger.next(); // Trigger for load datatable
      this.spinnerLoading = false;
    }, 150);
  }

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
}
