import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { DataTableDirective } from "angular-datatables";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { ProcessOwnerCodeService } from "src/app/_services/process_owner_code.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  public processOwnerCodeData = {
    unit: "",
    level: "",
    code: "",
    last_letter_number: "",
  };
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  @ViewChild("modalTambah", { static: true }) public modalTambah: any;
  @ViewChild("modalEdit", { static: true }) public modalEdit: any;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public loadTable = false;
  public loadingForm = false;
  public dataMasterKodePemilikProses = [];
  public formDataKodePemilikProses: FormGroup;
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
  checked: boolean = false;
  public spinnerLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    private processOwnerCodeService: ProcessOwnerCodeService,
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

    this.formDataKodePemilikProses = this.fb.group({
      id: new FormControl(""),
      unit: new FormControl("", Validators.required),
      level: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
      last_letter_number: new FormControl("", Validators.required),
    });

    this.formFilter = this.fb.group({
      unit: new FormControl("", Validators.required),
      level: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
      last_letter_number: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData(): void {
    this.dataMasterKodePemilikProses = [];

    this.spinnerLoading = true;
    this.processOwnerCodeService.getProcessOwnerCode("all").subscribe(
      (response) => {
        this.dataMasterKodePemilikProses = response.data;
        this.dtTrigger.next();

        this.spinnerLoading = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Process Owner Code", "error");
        this.dtTrigger.next();

        this.spinnerLoading = false;
      }
    );
  }

  openFormSave(): void {
    this.loadingForm = true;
    this.filter = false;
    this.resetForm();
    this.formDataKodePemilikProses.reset();
    this.loadingForm = false;
    this.modalTambah.show();
  }

  saveData(): void {
    this.loadingForm = true;
    const body = {
      unit: this.processOwnerCodeData.unit,
      level: this.processOwnerCodeData.level,
      code: this.processOwnerCodeData.code,
      last_number: 0,
    };
    this.processOwnerCodeService.postProcessOwnerCode(body).subscribe(
      (response) => {
        if (this.dataMasterKodePemilikProses.length == 0) {
          window.location.reload();
        } else {
          this.formDataKodePemilikProses.reset();
          this.render();
          this.getAllData();
        }
        this.loadingForm = false;
        this.modalTambah.hide();
        this.messageSuccess(
          this.translateService.instant(
            "ROOT.Kode_Pemilik_Proses_Berhasil_Ditambah"
          )
        );
      },
      (error) => {
        Swal.fire("Error API", "Post Process Owner Code", "error");

        this.loadingForm = false;
      }
    );
  }

  openFormEdit(data: any): void {
    this.filter = false;
    this.resetForm();
    let { id, unit, level, code, last_number } = data;
    this.formDataKodePemilikProses.patchValue({
      id: id,
      unit: unit,
      level: level,
      code: code,
      last_letter_number: last_number,
    });
    this.modalEdit.show();
  }

  saveEditData(): void {
    this.loadingForm = true;
    let id = this.formDataKodePemilikProses.value.id;

    const body = {
      unit: this.processOwnerCodeData.unit,
      level: this.processOwnerCodeData.level,
      code: this.processOwnerCodeData.code,
      last_number: this.processOwnerCodeData.last_letter_number,
    };

    this.processOwnerCodeService.updateProcessOwnerCode(body, id).subscribe(
      (response) => {
        this.formDataKodePemilikProses.reset();
        if (this.dataMasterKodePemilikProses.length > 0) this.render();
        this.getAllData();
        this.loadingForm = false;
        this.modalEdit.hide();
        this.messageSuccess(
          this.translateService.instant(
            "ROOT.Kode_Pemilik_Proses_Berhasil_Diedit"
          )
        );
      },
      (error) => {
        Swal.fire("Error API", "Update Prosess Owner Code", "error");

        this.loadingForm = false;
      }
    );
  }

  activateProcessOwner(id: number, unit: string, code: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant(
          "ROOT.untuk_mengaktifkan_Kode_Pemilik_Proses"
        ) +
        " " +
        unit +
        " (" +
        code +
        ")",
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willActivate) => {
      if (willActivate.dismiss) {
      } else {
        this.processOwnerCodeService.activateProcessOwnerCode(id).subscribe(
          (response) => {
            if (this.dataMasterKodePemilikProses.length > 0) this.render();
            this.getAllData();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Kode_Pemilik_Proses_Berhasil_Diaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Activate Process Owner", "error");
          }
        );
      }
    });
  }

  deleteProcessOwner(id: number, unit: string, code: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant(
          "ROOT.untuk_menonaktifkan_Kode_Pemilik_Proses"
        ) +
        " " +
        unit +
        " (" +
        code +
        ")",
      type: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDeactivate) => {
      if (willDeactivate.dismiss) {
      } else {
        this.processOwnerCodeService.deteleProcessOwnerCode(id).subscribe(
          (response) => {
            if (this.dataMasterKodePemilikProses.length > 0) this.render();
            this.getAllData();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Kode_Pemilik_Proses_Berhasil_Dinonaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Delete Process Owner", "error");
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
    this.dataMasterKodePemilikProses = [];

    this.spinnerLoading = true;

    const data = {};

    if (this.formFilter.value.unit) {
      data["unit"] = this.formFilter.value.unit;
    }
    if (this.formFilter.value.level) {
      data["level"] = this.formFilter.value.level;
    }
    if (this.checked) {
      data["is-code-null"] = "1";
    } else {
      if (this.formFilter.value.code) {
        data["code"] = this.formFilter.value.code;
      }
    }
    if (this.formFilter.value.last_letter_number) {
      data["last-letter"] = this.formFilter.value.last_letter_number;
    }
    if (!Array.isArray(this.formFilter.value.status)) {
      data["status"] = this.formFilter.value.status;
    }

    let searchParams = new URLSearchParams(data);

    this.processOwnerCodeService
      .getProcessOwnerCode("all?" + searchParams)
      .subscribe(
        (response) => {
          this.dataMasterKodePemilikProses = response.data;
          this.dtTrigger.next();

          this.spinnerLoading = false;
        },
        (error) => {
          Swal.fire("Error API", "Get Process Owner Code", "error");
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
      unit: "",
      level: "",
      code: "",
      last_letter_number: "",
      status: [],
    });
    this.checked = false;
  }

  sync(): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text: this.translateService.instant(
        "ROOT.untuk_menyingkronisasi_Kode_Pemilik_Proses"
      ),
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willSync) => {
      if (willSync.dismiss) {
      } else {
        Swal.fire(
          "Oops Sorry...",
          "Something went wrong, API not avaiable",
          "error"
        );
      }
    });
  }

  switchNullCode(): void {
    this.formFilter.patchValue({
      code: "",
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
