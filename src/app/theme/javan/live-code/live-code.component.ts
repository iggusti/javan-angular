import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { DataTableDirective } from "angular-datatables";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-live-code",
  templateUrl: "./live-code.component.html",
  styleUrls: ["./live-code.component.scss"],
})
export class LiveCodeComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: any;
  public spinnerLoading: boolean;
  public dtTrigger = new Subject();
  public loadCard: boolean = false;
  public loadingForm: boolean = false;
  public listData = [];

  @ViewChild("modalPopUp", { static: true })
  public modalPopUp: any;
  public detailItem: any;

  constructor(
    private broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    private appService: AppService
  ) {
    translateService.setDefaultLang(localStorage.getItem("lang"));
    broadcasterService.changeLangBroadcast$.subscribe((res) => {
      translateService.setDefaultLang(res.lang);
    });
  }

  ngOnInit(): void {
    this.getLiveCode();
  }

  getLiveCode(): void {
    this.spinnerLoading = true;
    this.listData = [];

    this.appService.getLiveCode().subscribe(
      (response) => {
        this.listData = response;

        this.dtTrigger.next(); // Trigger for load datatable
        this.spinnerLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openPopUp(item: any): void {
    this.modalPopUp.show();
    this.detailItem = item;
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
