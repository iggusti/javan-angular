import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { DataTableDirective } from "angular-datatables";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivityCodeService } from "src/app/_services/activity_code.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  public activityData = {
    field: "",
    activity_scope: "",
    code: "",
  };
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  @ViewChild("modalTambah", { static: true }) public modalTambah: any;
  @ViewChild("modalEdit", { static: true }) public modalEdit: any;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public loadTable = false;
  public loadingForm = false;
  public dataMasterKodeActivity = [];
  public formDataKodeActivity: FormGroup;
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
    private activityCodeService: ActivityCodeService,
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
            columns: [0, 1, 2, 3],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
        },
        {
          extend: "excel",
          exportOptions: {
            columns: [0, 1, 2, 3],
          },
          customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets["sheet1.xml"];
            $("row[r!=1][r!=2] c", sheet).attr("s", "50");
          },
        },
        {
          extend: "csv",
          exportOptions: {
            columns: [0, 1, 2, 3],
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

    this.formDataKodeActivity = this.fb.group({
      id: new FormControl(""),
      field: new FormControl("", Validators.required),
      activity_scope: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
    });

    this.formFilter = this.fb.group({
      field: new FormControl("", Validators.required),
      activity_scope: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData(): void {
    this.dataMasterKodeActivity = [];

    this.spinnerLoading = true;
    this.activityCodeService.getActivity("all").subscribe(
      (response) => {
        this.dataMasterKodeActivity = response.data;
        this.dtTrigger.next();

        this.spinnerLoading = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Activity", "error");
        this.dtTrigger.next();

        this.spinnerLoading = false;
      }
    );
  }

  openFormSave(): void {
    this.loadingForm = true;
    this.filter = false;
    this.resetForm();
    this.formDataKodeActivity.reset();
    this.loadingForm = false;
    this.modalTambah.show();
  }

  saveData(): void {
    this.loadingForm = true;
    const body = {
      field: this.activityData.field,
      activity_scope: this.activityData.activity_scope,
      code: this.activityData.code,
    };
    this.activityCodeService.postActivity(body).subscribe(
      (response) => {
        if (this.dataMasterKodeActivity.length == 0) {
          window.location.reload();
        } else {
          this.formDataKodeActivity.reset();
          this.render();
          this.getAllData();
        }
        this.loadingForm = false;
        this.modalTambah.hide();
        this.messageSuccess(
          this.translateService.instant("ROOT.Kode_Kegiatan_Berhasil_Ditambah")
        );
      },
      (error) => {
        Swal.fire(
          "Error API",
          this.translateService.instant(
            "ROOT.The_field,_activity_scope_and_code_has_already_been_taken"
          ),
          "error"
        );

        this.loadingForm = false;
      }
    );
  }

  openFormEdit(data: any): void {
    this.filter = false;
    this.resetForm();
    let { id, field, activity_scope, code } = data;
    this.formDataKodeActivity.patchValue({
      id: id,
      field: field,
      activity_scope: activity_scope,
      code: code,
    });
    this.modalEdit.show();
  }

  saveEditData(): void {
    this.loadingForm = true;
    let id = this.formDataKodeActivity.value.id;

    const body = {
      field: this.activityData.field,
      activity_scope: this.activityData.activity_scope,
      code: this.activityData.code,
    };

    this.activityCodeService.updateActivity(body, id).subscribe(
      (response) => {
        this.formDataKodeActivity.reset();
        if (this.dataMasterKodeActivity.length > 0) this.render();
        this.getAllData();
        this.loadingForm = false;
        this.modalEdit.hide();
        this.messageSuccess(
          this.translateService.instant("ROOT.Kode_Kegiatan_Berhasil_Diedit")
        );
      },
      (error) => {
        Swal.fire(
          "Error API",
          this.translateService.instant(
            "ROOT.The_field,_activity_scope_and_code_has_already_been_taken"
          ),
          "error"
        );

        this.loadingForm = false;
      }
    );
  }

  activateProcessOwner(id: number, field: string, code: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant("ROOT.untuk_mengaktifkan_Kode_Kegiatan") +
        " " +
        field +
        " (" +
        code +
        ")",
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willActivate) => {
      if (willActivate.dismiss) {
      } else {
        this.activityCodeService.activateActivity(id).subscribe(
          (response) => {
            if (this.dataMasterKodeActivity.length > 0) this.render();
            this.getAllData();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Kode_Kegiatan_Berhasil_Diaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Activate Activity", "error");
          }
        );
      }
    });
  }

  deleteProcessOwner(id: number, field: string, code: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant(
          "ROOT.untuk_menonaktifkan_Kode_Kegiatan"
        ) +
        " " +
        field +
        " (" +
        code +
        ")",
      type: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDeactivate) => {
      if (willDeactivate.dismiss) {
      } else {
        this.activityCodeService.deteleActivity(id).subscribe(
          (response) => {
            if (this.dataMasterKodeActivity.length > 0) this.render();
            this.getAllData();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Kode_Kegiatan_Berhasil_Dinonaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Delete Activity", "error");
          }
        );
      }
    });
  }

  openFilter(): void {
    this.filter = !this.filter;
    this.resetForm();
  }

  filterData(): void {
    this.render();
    this.dataMasterKodeActivity = [];

    this.spinnerLoading = true;

    const data = {};

    if (this.formFilter.value.field) {
      data["field"] = this.formFilter.value.field;
    }
    if (this.formFilter.value.activity_scope) {
      data["scope"] = this.formFilter.value.activity_scope;
    }
    if (this.formFilter.value.code) {
      data["code"] = this.formFilter.value.code;
    }
    if (!Array.isArray(this.formFilter.value.status)) {
      data["status"] = this.formFilter.value.status;
    }

    let searchParams = new URLSearchParams(data);

    this.activityCodeService.getActivity("all?" + searchParams).subscribe(
      (response) => {
        this.dataMasterKodeActivity = response.data;
        this.dtTrigger.next();

        this.spinnerLoading = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Activity", "error");
        this.dtTrigger.next();

        this.spinnerLoading = false;
      }
    );
  }

  cleanFilter(): void {
    this.resetForm();
    this.render();
    this.getAllData();
  }

  resetForm(): void {
    this.formFilter.patchValue({
      field: "",
      activity_scope: "",
      code: "",
      last_letter_number: "",
      status: [],
    });
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
