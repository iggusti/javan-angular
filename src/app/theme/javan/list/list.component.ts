import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { DataTableDirective } from "angular-datatables";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  @ViewChild("modalTambah", { static: true }) public modalTambah: any;
  @ViewChild("modalEdit", { static: true }) public modalEdit: any;
  @ViewChild("modalLihatReviewer", { static: true })
  public modalLihatReviewer: any;
  public dtOptions: any;
  public dtTrigger = new Subject();

  public loadTable: boolean;
  public loadingForm: boolean;
  public listUsers = [];
  public formDataTemplate: FormGroup;
  public listDataPosition = [];
  public listDataSigner = [];
  public listDataPenomoranSurat = [];
  public modelSigner = [];
  public modelPenomoranSurat = [];
  public modelDisseminator = [];
  public modelPositionId = [];
  public modelLihatReviewer = [];
  public listLihatReviewer = [];

  public formFilter: FormGroup;
  public filter: boolean = false;
  public listStatus = [
    {
      value: 1,
      label: "Aktif",
    },
    {
      value: 0,
      label: "Tidak Aktif (Non Aktif)",
    },
  ];
  public spinnerLoading: boolean;

  constructor(
    private fb: FormBuilder,
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

    this.formDataTemplate = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      jumlahposition: this.fb.array([]),
      signer: new FormControl("", Validators.required),
      penomoranSurat: new FormControl("", Validators.required),
      disseminator: new FormControl("", Validators.required),
    });

    this.formFilter = this.fb.group({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      reviewer: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.spinnerLoading = true;
    this.listUsers = [];

    this.appService.getListUsers().subscribe(
      (response) => {
        this.listUsers = response;

        this.dtTrigger.next(); // Trigger for load datatable
        this.spinnerLoading = false;
      },
      (error) => {}
    );
  }

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  messageSuccess(message: string): void {
    this.broadcasterService.notifBroadcast(true, {
      title: this.translateService.instant("ROOT.success"),
      msg: message,
      timeout: 5000,
      theme: "default",
      position: "top-right",
      type: "success",
    });
  }
}
