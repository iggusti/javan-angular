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
import { ExternalPartnerService } from "src/app/_services/external_partner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  @ViewChild("modalTambah", { static: true }) public modalTambah: any;
  @ViewChild("modalEdit", { static: true }) public modalEdit: any;
  public dtOptions: any;
  public dtTrigger = new Subject();
  public loadingForm: boolean;
  public loadTable: boolean;
  public dataMitraExternal = [];
  public formDataMitraExternal: FormGroup;
  public listCountry = [];
  public listProvince = [];
  public listCity = [];
  public email: boolean = false;
  public listDataLawStatus = [];
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
    private externalPartnerService: ExternalPartnerService,
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
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
        {
          extend: "excel",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets["sheet1.xml"];
            $("row[r!=1][r!=2] c", sheet).attr("s", "50");
          },
        },
        {
          extend: "csv",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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

    this.formDataMitraExternal = this.fb.group({
      id: new FormControl(""),
      law_status: new FormControl("", Validators.required),
      province: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      company_name: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      contact_position_name: new FormControl("", Validators.required),
    });

    this.formFilter = this.fb.group({
      law_status: new FormControl("", Validators.required),
      province: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      company_name: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      contact_position_name: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData(): void {
    this.spinnerLoading = true;
    this.dataMitraExternal = [];
    this.externalPartnerService.getExternalPartner("all").subscribe(
      (response) => {
        this.dataMitraExternal = response.data;
        this.dtTrigger.next();

        this.spinnerLoading = false;
      },
      (error) => {
        Swal.fire("Error API", "Get External Partner", "error");
        this.dtTrigger.next();

        this.spinnerLoading = false;
      }
    );
  }

  openFormSave(): void {
    this.loadingForm = true;
    this.filter = false;
    this.resetForm();
    this.formDataMitraExternal.reset();
    this.getDataCountry("default");
    this.getDataLawStatus();
    this.email = true;
    this.modalTambah.show();
  }

  getDataCountry(defaultValue: string = null): void {
    this.externalPartnerService.getCountries("").subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        response.data.forEach((el) => {
          inject = {
            label: el.code + " | " + el.detail_name,
            value: el.id,
          };
          controller.push(inject);
        });
        this.listCountry = controller;

        if (defaultValue) {
          this.formDataMitraExternal.patchValue({
            country: ["1"],
          });

          this.getDataProvince();
        }

        this.loadingForm = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Countries", "error");
        this.loadingForm = false;
      }
    );
  }

  getDataProvince(id: number = null, province_id: number = null): void {
    this.loadingForm = true;
    this.listProvince = [];
    this.listCity = [];
    let param = this.formDataMitraExternal.value.country;
    if (id) {
      param = id;
    } else if (this.filter) {
      param = this.formFilter.value.country;
    }
    this.externalPartnerService.getProvinces(param).subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        response.data.forEach((el) => {
          inject = {
            label: el.detail_name,
            value: el.id,
          };
          controller.push(inject);
        });
        this.listProvince = controller;

        if (!id) {
          this.formDataMitraExternal.patchValue({
            province: "",
            city: "",
          });
        } else if (id) {
          this.formDataMitraExternal.patchValue({
            province: [province_id],
          });
        }

        this.loadingForm = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Provincies", "error");
        this.loadingForm = false;
      }
    );
  }

  getDataCity(id: number = null, city_id: number = null): void {
    this.loadingForm = true;
    this.listCity = [];
    let param = this.formDataMitraExternal.value.province;
    if (id) {
      param = id;
    } else if (this.filter) {
      param = this.formFilter.value.province;
    }
    this.externalPartnerService.getCitys(param).subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        response.data.forEach((el) => {
          inject = {
            label: el.detail_name,
            value: el.id,
          };
          controller.push(inject);
        });
        this.listCity = controller;

        if (!id) {
          this.formDataMitraExternal.patchValue({
            city: "",
          });
        } else if (id) {
          this.formDataMitraExternal.patchValue({
            city: [city_id],
          });
        }

        this.loadingForm = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Citys", "error");
        this.loadingForm = false;
      }
    );
  }

  getDataLawStatus(): void {
    this.listDataLawStatus = [];
    this.externalPartnerService.getLawStatus().subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        response.data.forEach((el) => {
          inject = {
            label: el.name,
            value: el.id,
          };
          controller.push(inject);
        });
        this.listDataLawStatus = controller;
        this.loadingForm = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Law Status", "error");
        this.loadingForm = false;
      }
    );
  }

  checkEmail(): void {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.email = regexEmail.test(
      String(this.formDataMitraExternal.value.email).toLowerCase()
    );

    if (this.formDataMitraExternal.value.email == "") {
      this.email = true;
    }
  }

  saveData(): void {
    this.loadingForm = true;

    if (this.formDataMitraExternal.value.country == "1") {
      this.formDataMitraExternal.value.country =
        this.formDataMitraExternal.value.country[0];
    }

    const body = {
      law_status_id: this.formDataMitraExternal.value.law_status,
      company_name: this.formDataMitraExternal.value.company_name,
      contact: this.formDataMitraExternal.value.contact,
      address: this.formDataMitraExternal.value.address,
      countryid: this.formDataMitraExternal.value.country,
      contact_position_name:
        this.formDataMitraExternal.value.contact_position_name,
    };

    if (this.formDataMitraExternal.value.province) {
      body["provinceid"] = this.formDataMitraExternal.value.province;
    }

    if (this.formDataMitraExternal.value.city) {
      body["cityregionid"] = this.formDataMitraExternal.value.city;
    }

    if (this.formDataMitraExternal.value.phone) {
      body["phone"] = this.formDataMitraExternal.value.phone;
    }

    if (this.formDataMitraExternal.value.email) {
      body["email"] = this.formDataMitraExternal.value.email;
    }

    this.externalPartnerService.postExternalPartner(body).subscribe(
      (response) => {
        if (this.dataMitraExternal.length == 0) {
          window.location.reload();
        } else {
          this.formDataMitraExternal.reset();
          this.render();
          this.getAllData();
        }
        this.loadingForm = false;
        this.modalTambah.hide();
        this.messageSuccess(
          this.translateService.instant(
            "ROOT.Mitra_Eksternal_Berhasil_Ditambah"
          )
        );
      },
      (error) => {
        Swal.fire(
          "Error API",
          this.translateService.instant(
            "ROOT.The_company_name_and_contact_has_already_been_taken"
          ),
          "error"
        );

        this.loadingForm = false;
      }
    );
  }

  openFormEdit(data: any): void {
    this.loadingForm = true;
    this.filter = false;
    this.resetForm();
    this.formDataMitraExternal.reset();
    let {
      id,
      law_status_id,
      provinceid,
      cityregionid,
      company_name,
      contact,
      address,
      countryid,
      phone,
      email,
      contact_position_name,
    } = data;
    this.getDataLawStatus();
    this.getDataCountry();
    if (provinceid) {
      this.getDataProvince(countryid, provinceid);
    }
    if (cityregionid) {
      this.getDataCity(provinceid, cityregionid);
    }
    this.formDataMitraExternal.patchValue({
      id: id,
      law_status: [law_status_id],
      company_name: company_name,
      contact: contact,
      address: address,
      country: [countryid],
      phone: phone,
      email: email,
      contact_position_name: contact_position_name,
    });
    this.checkEmail();
    this.email = true;
    this.loadingForm = false;
    this.modalEdit.show();
  }

  editData(): void {
    this.loadingForm = true;
    let id = this.formDataMitraExternal.value.id;

    const body = {
      company_name: this.formDataMitraExternal.value.company_name,
      contact: this.formDataMitraExternal.value.contact,
      address: this.formDataMitraExternal.value.address,
      contact_position_name:
        this.formDataMitraExternal.value.contact_position_name,
    };

    if (Array.isArray(this.formDataMitraExternal.value.law_status)) {
      body["law_status_id"] = this.formDataMitraExternal.value.law_status[0];
    } else if (this.formDataMitraExternal.value.law_status) {
      body["law_status_id"] = this.formDataMitraExternal.value.law_status;
    }
    if (Array.isArray(this.formDataMitraExternal.value.country)) {
      body["countryid"] = this.formDataMitraExternal.value.country[0];
    } else if (this.formDataMitraExternal.value.country) {
      body["countryid"] = this.formDataMitraExternal.value.country;
    }
    if (Array.isArray(this.formDataMitraExternal.value.province)) {
      if (this.formDataMitraExternal.value.province[0]) {
        body["provinceid"] = this.formDataMitraExternal.value.province[0];
      }
    } else if (this.formDataMitraExternal.value.province) {
      body["provinceid"] = this.formDataMitraExternal.value.province;
    }
    if (Array.isArray(this.formDataMitraExternal.value.city)) {
      if (this.formDataMitraExternal.value.city[0]) {
        body["cityregionid"] = this.formDataMitraExternal.value.city[0];
      }
    } else if (this.formDataMitraExternal.value.city) {
      body["cityregionid"] = this.formDataMitraExternal.value.city;
    }

    if (this.formDataMitraExternal.value.phone) {
      body["phone"] = this.formDataMitraExternal.value.phone;
    } else {
      body["phone"] = "kosong";
    }

    if (this.formDataMitraExternal.value.email) {
      body["email"] = this.formDataMitraExternal.value.email;
    } else {
      body["email"] = "kosong";
    }

    this.externalPartnerService.updateExternalPartner(body, id).subscribe(
      (response) => {
        this.formDataMitraExternal.reset();
        if (this.dataMitraExternal.length > 0) this.render();
        this.getAllData();
        this.loadingForm = false;
        this.modalEdit.hide();
        this.messageSuccess(
          this.translateService.instant("ROOT.Mitra_Eksternal_Berhasil_Diedit")
        );
      },
      (error) => {
        Swal.fire(
          "Error API",
          this.translateService.instant(
            "ROOT.The_company_name_and_contact_has_already_been_taken"
          ),
          "error"
        );

        this.loadingForm = false;
      }
    );
  }

  activateMitraExternal(id: number, company_name: string, name: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant(
          "ROOT.untuk_mengaktifkan_Mitra_Eksternal"
        ) +
        " " +
        company_name +
        " - " +
        name,
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willActivate) => {
      if (willActivate.dismiss) {
      } else {
        this.externalPartnerService.activateExternalPartner(id).subscribe(
          (response) => {
            if (this.dataMitraExternal.length > 0) this.render();
            this.getAllData();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Mitra_Eksternal_Berhasil_Diaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Activate External Partner", "error");
          }
        );
      }
    });
  }

  deleteMitraExternal(id: number, company_name: string, name: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant(
          "ROOT.untuk_menonaktifkan_Mitra_Eksternal"
        ) +
        " " +
        company_name +
        " - " +
        name,
      type: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDeactivate) => {
      if (willDeactivate.dismiss) {
      } else {
        this.externalPartnerService.deteleExternalPartner(id).subscribe(
          (response) => {
            if (this.dataMitraExternal.length > 0) this.render();
            this.getAllData();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Mitra_Eksternal_Berhasil_Dinonaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Delete External Partner", "error");
          }
        );
      }
    });
  }

  openFilter(): void {
    this.filter = !this.filter;
    this.listProvince = [];
    this.listCity = [];
    this.resetForm();
    this.getDataCountry();
    this.getDataLawStatus();
  }

  filterData(): void {
    this.render();

    this.spinnerLoading = true;
    this.dataMitraExternal = [];

    const data = {};

    if (this.formFilter.value.company_name) {
      data["company-name"] = this.formFilter.value.company_name;
    }
    if (this.formFilter.value.contact) {
      data["contact"] = this.formFilter.value.contact;
    }
    if (this.formFilter.value.contact_position_name) {
      data["position"] = this.formFilter.value.contact_position_name;
    }
    if (this.formFilter.value.address) {
      data["address"] = this.formFilter.value.address;
    }
    if (!Array.isArray(this.formFilter.value.country)) {
      data["country"] = this.formFilter.value.country;
    }
    if (!Array.isArray(this.formFilter.value.province)) {
      data["province"] = this.formFilter.value.province;
    }
    if (!Array.isArray(this.formFilter.value.city)) {
      data["city"] = this.formFilter.value.city;
    }
    if (!Array.isArray(this.formFilter.value.law_status)) {
      data["law-status"] = this.formFilter.value.law_status;
    }
    if (this.formFilter.value.email) {
      data["email"] = this.formFilter.value.email;
    }
    if (this.formFilter.value.phone) {
      data["phone"] = this.formFilter.value.phone;
    }
    if (!Array.isArray(this.formFilter.value.status)) {
      data["status"] = this.formFilter.value.status;
    }

    let searchParams = new URLSearchParams(data);

    this.externalPartnerService
      .getExternalPartner("all?" + searchParams)
      .subscribe(
        (response) => {
          this.dataMitraExternal = response.data;
          this.dtTrigger.next();

          this.spinnerLoading = false;
        },
        (error) => {
          Swal.fire("Error API", "Get External Partner", "error");
          this.dtTrigger.next();

          this.spinnerLoading = false;
        }
      );
  }

  cleanFilter(): void {
    this.listProvince = [];
    this.listCity = [];
    this.resetForm();
    this.render();
    this.getAllData();
  }

  resetForm(): void {
    this.formFilter.patchValue({
      law_status: [],
      province: [],
      city: [],
      company_name: "",
      contact: "",
      address: "",
      country: [],
      phone: "",
      email: "",
      contact_position_name: "",
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
