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
import { TemplateService } from "src/app/_services/template.service";
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
  public listTemplateMaster = [];
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
    private appService: AppService,
    private templateService: TemplateService
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

  ngOnInit() {
    this.getTemplateMaster();
    this.getSigner();
    this.getPenomoranSurat();
  }

  getTemplateMaster(): void {
    this.spinnerLoading = true;
    this.listTemplateMaster = [];
    this.templateService.getTemplateMaster("").subscribe(
      (response) => {
        this.listTemplateMaster = response.data;
        this.dtTrigger.next();

        this.spinnerLoading = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Template Master", "error");
        this.dtTrigger.next();

        this.spinnerLoading = false;
      }
    );
  }

  openFormSave(): void {
    this.loadingForm = true;
    this.filter = false;
    this.resetForm();
    this.formDataTemplate.reset();
    this.jumlahposition().clear();
    this.modelSigner = [];
    this.modelPenomoranSurat = [];
    this.modelDisseminator = [];
    this.modelPositionId = [];
    this.getPosition();
    this.loadingForm = false;
    this.modalTambah.show();
  }

  jumlahposition(): FormArray {
    return this.formDataTemplate.get("jumlahposition") as FormArray;
  }

  newPosition(): FormGroup {
    return this.fb.group({
      positionId: "",
    });
  }

  addPosition(edit: any = null): void {
    if (edit) {
      Swal.fire({
        title: this.translateService.instant("ROOT.Mohon_maaf"),
        text: this.translateService.instant(
          "ROOT.Anda_akan_menginput_ulang_Reviewer,_Penomoran_Surat,_dan_Disseminator"
        ),
        type: "warning",
        showCloseButton: true,
        showCancelButton: true,
      }).then((willAdd) => {
        if (willAdd.dismiss) {
        } else {
          this.modelDisseminator = [];
          this.modelPenomoranSurat = [];
          this.modelPositionId = [];
          this.jumlahposition().push(this.newPosition());
        }
      });
    } else {
      this.jumlahposition().push(this.newPosition());
    }
  }

  removePositionAll(): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Mohon_maaf"),
      text: this.translateService.instant(
        "ROOT.Anda_akan_menginput_ulang_Reviewer,_Penomoran_Surat,_dan_Disseminator"
      ),
      type: "warning",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willRemove) => {
      if (willRemove.dismiss) {
      } else {
        this.modelDisseminator = [];
        this.modelPenomoranSurat = [];
        this.modelPositionId = [];
        this.jumlahposition().clear();
      }
    });
  }

  removePosition(i: number): void {
    this.jumlahposition().removeAt(i);
    this.modelPositionId.splice(i, 1);
  }

  getPosition(): void {
    this.appService.getPosition("0/0/0/0/1").subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        response.data.forEach((el) => {
          if (
            el.name.includes("STAFF") ||
            el.name.includes("DOSEN FAKULTAS") ||
            el.name.includes("DOSEN PROGRAM STUDI") ||
            el.name.includes("DOSEN PRODI")
          ) {
          } else {
            inject = {
              label: el.name,
              value: el.positionid,
            };
            controller.push(inject);
          }
        });
        this.listDataPosition = controller;
        this.listDataPosition.sort((a, b) => (a.label > b.label ? 1 : -1));
      },
      (error) => {
        Swal.fire("Error API", "Get Position", "error");
        this.loadingForm = false;
      }
    );
  }

  getSigner(): void {
    this.appService.getPosition("0/0/0/0/1/1/2").subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        console.log(response.data);
        response.data.forEach((el) => {
          // if (
          //   el.name.includes("KEPALA BAGIAN") ||
          //   el.name.includes("WAKIL KETUA PUSAT PENELITIAN") ||
          //   el.name.includes("KEPALA URUSAN") ||
          //   el.name.includes("MANAJER") ||
          //   el.name.includes("ASISTEN MANAJER") ||
          //   el.name.includes("KETUA PROGRAM STUDI") ||
          //   el.name.includes("SEKRETARIS PROGRAM STUDI") ||
          //   el.name.includes("KETUA KK") ||
          //   el.name.includes("DOSEN FAKULTAS") ||
          //   el.name.includes("DOSEN PRODI") ||
          //   el.name.includes("DOSEN PROGRAM STUDI") ||
          //   el.name.includes("STAFF")
          // ) {
          // } else {
          inject = {
            label: el.name,
            value: el.positionid,
          };
          controller.push(inject);
          // }
        });
        this.listDataSigner = controller;
        this.listDataSigner.sort((a, b) => (a.label > b.label ? 1 : -1));
      },
      (error) => {
        Swal.fire("Error API", "Get Position", "error");
        this.loadingForm = false;
      }
    );
  }

  getPenomoranSurat(): void {
    this.appService.getPosition("0/0/0/0/1").subscribe(
      (response) => {
        const controller = [];
        let inject: any;
        response.data.forEach((el) => {
          if (
            el.name.includes(
              "KEPALA URUSAN SEKRETARIAT DAN PROTOKOLER PIMPINAN"
            ) ||
            el.name.includes("KEPALA URUSAN SEKRETARIAT (")
          ) {
            inject = {
              label: el.name,
              value: el.positionid,
            };
            controller.push(inject);
          }
        });
        this.listDataPenomoranSurat = controller;
        this.listDataPenomoranSurat.sort((a, b) =>
          a.label > b.label ? 1 : -1
        );
      },
      (error) => {
        Swal.fire("Error API", "Get Position", "error");
        this.loadingForm = false;
      }
    );
  }

  positionIdError(error: any): void {
    if (error.error.message.includes("tidak memiliki pemangku jabatan!")) {
      Swal.fire(
        "Error API",
        error.error.message + " Silakan edit ulang posisi tersebut",
        "error"
      );
    } else {
      Swal.fire("Error API", "Post Template Flow", "error");
    }
  }

  saveData(): void {
    if (this.formDataTemplate.value.jumlahposition.length > 0) {
      this.loadingForm = true;

      const body = {
        name: this.formDataTemplate.value.name,
        description: this.formDataTemplate.value.description,
      };

      this.templateService.postTemplateMaster(body).subscribe(
        (response) => {
          const responseId = response.id;

          const body = {
            template_master_id: responseId,
            position_id: "",
            description: "pembuat naskah",
            order_number: 1,
          };

          this.templateService.postTemplateFlow(body).subscribe(
            (response) => {},
            (error) => {
              this.positionIdError(error);
            }
          );

          for (
            var i = 0;
            i < this.formDataTemplate.value.jumlahposition.length;
            i++
          ) {
            const body = {
              template_master_id: responseId,
              position_id:
                this.formDataTemplate.value.jumlahposition[i].positionId,
              description: "reviewer ke-" + (i + 1),
              order_number: i + 2,
            };

            this.templateService.postTemplateFlow(body).subscribe(
              (response) => {},
              (error) => {
                this.positionIdError(error);
              }
            );
          }

          const bodySigner = {
            template_master_id: responseId,
            position_id: this.formDataTemplate.value.signer,
            description: "penandatangan",
            order_number: this.formDataTemplate.value.jumlahposition.length + 2,
          };

          this.templateService.postTemplateFlow(bodySigner).subscribe(
            (response) => {},
            (error) => {
              this.positionIdError(error);
            }
          );

          const bodyPenomoranSurat = {
            template_master_id: responseId,
            position_id: this.formDataTemplate.value.penomoranSurat,
            description: "penomoran surat",
            order_number: this.formDataTemplate.value.jumlahposition.length + 3,
          };

          this.templateService.postTemplateFlow(bodyPenomoranSurat).subscribe(
            (response) => {},
            (error) => {
              this.positionIdError(error);
            }
          );

          const bodyDisseminator = {
            template_master_id: responseId,
            position_id: this.formDataTemplate.value.disseminator,
            description: "disseminator",
            order_number: this.formDataTemplate.value.jumlahposition.length + 4,
          };

          this.templateService.postTemplateFlow(bodyDisseminator).subscribe(
            (response) => {},
            (error) => {
              this.positionIdError(error);
            }
          );

          if (this.listTemplateMaster.length == 0) {
            window.location.reload();
          } else {
            this.formDataTemplate.reset();
            this.render();
            this.getTemplateMaster();
          }
          this.loadingForm = false;
          this.modalTambah.hide();
          this.messageSuccess(
            this.translateService.instant("ROOT.Template_Berhasil_Ditambah")
          );
        },
        (error) => {
          Swal.fire(
            "Error API",
            this.translateService.instant(
              "ROOT.The_name_has_already_been_taken"
            ),
            "error"
          );

          this.loadingForm = false;
        }
      );
    } else {
      Swal.fire(
        this.translateService.instant("ROOT.Mohon_maaf"),
        this.translateService.instant(
          "ROOT.Minimal_Anda_harus_menginput_1_(satu)_Reviewer._Silakan_tekan_tombol_+_(Tambah_Reviewer)"
        ),
        "warning"
      );
    }
  }

  openLihatReviewer(data: any = null): void {
    this.loadingForm = true;
    this.modelLihatReviewer = [];
    this.listLihatReviewer = [];

    this.modelLihatReviewer = [
      {
        name: data.name,
        description: data.description,
        status: data.deleted_at,
      },
    ];

    this.templateService.getTemplateFlow(data.id).subscribe(
      (response) => {
        this.listLihatReviewer = response.data;
        this.loadingForm = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Template Flow", "error");
        this.loadingForm = false;
      }
    );

    this.modalLihatReviewer.show();
  }

  openFormEdit(data: any): void {
    this.loadingForm = true;
    this.filter = false;
    this.resetForm();
    this.formDataTemplate.reset();
    this.jumlahposition().clear();
    this.modelSigner = [];
    this.modelPenomoranSurat = [];
    this.modelDisseminator = [];
    this.modelPositionId = [];

    let { id, name, description } = data;
    this.formDataTemplate.patchValue({
      id: id,
      name: name,
      description: description,
    });
    this.getPosition();

    this.templateService.getTemplateFlow(id).subscribe(
      (response) => {
        for (var i = 0; i < response.data.length; i++) {
          if (i == response.data.length - 1) {
            this.formDataTemplate.patchValue({
              disseminator: [response.data[i].position_id],
            });
          } else if (i == response.data.length - 2) {
            this.formDataTemplate.patchValue({
              penomoranSurat: [response.data[i].position_id],
            });
          } else if (i == response.data.length - 3) {
            this.formDataTemplate.patchValue({
              signer: [response.data[i].position_id],
            });
          } else if (i != 0) {
            this.addPosition();
            // this.jumlahposition().patchValue([
            //   { positionId: [parseInt(response.data[i].position_id)] },
            // ]);
            this.modelPositionId[i - 1] = [response.data[i].position_id];
          }
        }
        this.loadingForm = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Template Flow", "error");
      }
    );
    this.modalEdit.show();
  }

  editData(): void {
    if (this.formDataTemplate.value.jumlahposition.length > 0) {
      this.loadingForm = true;

      let id = this.formDataTemplate.value.id;
      const body = {
        name: this.formDataTemplate.value.name,
        description: this.formDataTemplate.value.description,
      };

      for (
        var i = 0;
        i < this.formDataTemplate.value.jumlahposition.length;
        i++
      ) {
        if (this.formDataTemplate.value.jumlahposition[i].positionId[0]) {
          this.formDataTemplate.value.jumlahposition[i].positionId =
            this.formDataTemplate.value.jumlahposition[i].positionId[0];
        }
      }

      if (this.formDataTemplate.value.signer[0]) {
        this.formDataTemplate.value.signer =
          this.formDataTemplate.value.signer[0];
      }

      if (this.formDataTemplate.value.penomoranSurat[0]) {
        this.formDataTemplate.value.penomoranSurat =
          this.formDataTemplate.value.penomoranSurat[0];
      }

      if (this.formDataTemplate.value.disseminator[0]) {
        this.formDataTemplate.value.disseminator =
          this.formDataTemplate.value.disseminator[0];
      }

      this.templateService.updateTemplateMaster(body, id).subscribe(
        (response) => {
          let dataReviewer = this.formDataTemplate.value.jumlahposition;
          let dataSigner = this.formDataTemplate.value.signer;
          let dataPenomoranSurat = this.formDataTemplate.value.penomoranSurat;
          let dataDisseminator = this.formDataTemplate.value.disseminator;

          if (this.formDataTemplate.value.jumlahposition.length > 0) {
            this.templateService
              .deleteTemplateFlow("template_master/" + id)
              .subscribe(
                (response) => {
                  const body = {
                    template_master_id: id,
                    position_id: "",
                    description: "pembuat naskah",
                    order_number: 1,
                  };

                  this.templateService.postTemplateFlow(body).subscribe(
                    (response) => {},
                    (error) => {
                      this.positionIdError(error);
                    }
                  );

                  for (var i = 0; i < dataReviewer.length; i++) {
                    const body = {
                      template_master_id: id,
                      position_id: dataReviewer[i].positionId,
                      description: "reviewer ke-" + (i + 1),
                      order_number: i + 2,
                    };

                    this.templateService.postTemplateFlow(body).subscribe(
                      (response) => {},
                      (error) => {
                        this.positionIdError(error);
                      }
                    );
                  }

                  const bodySigner = {
                    template_master_id: id,
                    position_id: dataSigner,
                    description: "penandatangan",
                    order_number:
                      this.formDataTemplate.value.jumlahposition.length + 2,
                  };

                  this.templateService.postTemplateFlow(bodySigner).subscribe(
                    (response) => {},
                    (error) => {
                      this.positionIdError(error);
                    }
                  );

                  const bodyPenomoranSurat = {
                    template_master_id: id,
                    position_id: dataPenomoranSurat,
                    description: "penomoran surat",
                    order_number:
                      this.formDataTemplate.value.jumlahposition.length + 3,
                  };

                  this.templateService
                    .postTemplateFlow(bodyPenomoranSurat)
                    .subscribe(
                      (response) => {},
                      (error) => {
                        this.positionIdError(error);
                      }
                    );

                  const bodyDisseminator = {
                    template_master_id: id,
                    position_id: dataDisseminator,
                    description: "disseminator",
                    order_number:
                      this.formDataTemplate.value.jumlahposition.length + 4,
                  };

                  this.templateService
                    .postTemplateFlow(bodyDisseminator)
                    .subscribe(
                      (response) => {},
                      (error) => {
                        this.positionIdError(error);
                      }
                    );
                },
                (error) => {
                  Swal.fire("Error API", "Delete Template Flow", "error");
                }
              );
          }

          this.formDataTemplate.reset();
          this.render();
          this.getTemplateMaster();
          this.loadingForm = false;
          this.modalEdit.hide();
          this.messageSuccess(
            this.translateService.instant("ROOT.Template_Berhasil_Diedit")
          );
        },
        (error) => {
          Swal.fire(
            "Error API",
            this.translateService.instant(
              "ROOT.The_name_has_already_been_taken"
            ),
            "error"
          );

          this.loadingForm = false;
        }
      );
    } else {
      Swal.fire(
        this.translateService.instant("ROOT.Mohon_maaf"),
        this.translateService.instant(
          "ROOT.Minimal_Anda_harus_menginput_1_(satu)_Reviewer._Silakan_tekan_tombol_+_(Tambah_Reviewer)"
        ),
        "warning"
      );
    }
  }

  activateTemplate(id: number, name: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant("ROOT.untuk_mengaktifkan_Template") +
        " " +
        name,
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willActivate) => {
      if (willActivate.dismiss) {
      } else {
        this.templateService.activateTemplateMaster(id).subscribe(
          (response) => {
            this.render();
            this.getTemplateMaster();
            this.messageSuccess(
              this.translateService.instant("ROOT.Template_Berhasil_Diaktifkan")
            );
          },
          (error) => {
            Swal.fire("Error API", "Activate Template Master", "error");
          }
        );
      }
    });
  }

  deleteTemplate(id: number, name: string): void {
    Swal.fire({
      title: this.translateService.instant("ROOT.Apakah_anda_yakin?"),
      text:
        this.translateService.instant("ROOT.untuk_menonaktifkan_Template") +
        " " +
        name,
      type: "error",
      showCloseButton: true,
      showCancelButton: true,
    }).then((willDeactivate) => {
      if (willDeactivate.dismiss) {
      } else {
        this.templateService.deleteTemplateMaster(id).subscribe(
          (response) => {
            this.render();
            this.getTemplateMaster();
            this.messageSuccess(
              this.translateService.instant(
                "ROOT.Template_Berhasil_Dinonaktifkan"
              )
            );
          },
          (error) => {
            Swal.fire("Error API", "Delete Template Master", "error");
          }
        );
      }
    });
  }

  checkListDataPosition(edit: any = null): void {
    if (edit == "edit") {
      for (
        var i = 0;
        i < this.formDataTemplate.value.jumlahposition.length;
        i++
      ) {
        if (this.formDataTemplate.value.jumlahposition[i].positionId[0]) {
          this.formDataTemplate.value.jumlahposition[i].positionId =
            this.formDataTemplate.value.jumlahposition[i].positionId[0];
          // notChanged = true;
        }
      }
    }

    var tempDataPosition = [];
    for (
      var i = 0;
      i < this.formDataTemplate.value.jumlahposition.length;
      i++
    ) {
      var dataPositionIndex = tempDataPosition.indexOf(
        this.formDataTemplate.value.jumlahposition[
          this.formDataTemplate.value.jumlahposition.length - 1
        ].positionId
      );

      if (dataPositionIndex === -1) {
        tempDataPosition.push(
          this.formDataTemplate.value.jumlahposition[i].positionId
        );
      } else {
        Swal.fire(
          this.translateService.instant("ROOT.Mohon_maaf"),
          this.translateService.instant(
            "ROOT.Reviewer_sudah_terpilih,_silakan_lanjutkan_jika_memang_reviewer_tersebut_akan_dipilih_kembali_atau_silakan_koreksi_kembali_jika_ada_kesalahan"
          ),
          "warning"
        );
      }
    }
  }

  openFilter(): void {
    this.filter = !this.filter;
    this.resetForm();
    this.getPosition();
  }

  filterData(): void {
    this.render();

    this.spinnerLoading = true;
    this.listTemplateMaster = [];

    const data = {};

    if (this.formFilter.value.name) {
      data["name"] = this.formFilter.value.name;
    }
    if (this.formFilter.value.description) {
      data["description"] = this.formFilter.value.description;
    }
    if (!Array.isArray(this.formFilter.value.reviewer)) {
      data["position"] = this.formFilter.value.reviewer;
    }
    if (!Array.isArray(this.formFilter.value.status)) {
      data["status"] = this.formFilter.value.status;
    }

    let searchParams = new URLSearchParams(data);

    this.templateService.getTemplateMaster("?" + searchParams).subscribe(
      (response) => {
        this.listTemplateMaster = response.data;
        this.dtTrigger.next();

        this.spinnerLoading = false;
      },
      (error) => {
        Swal.fire("Error API", "Get Template Master", "error");
        this.dtTrigger.next();

        this.spinnerLoading = false;
      }
    );
  }

  cleanFilter(): void {
    this.resetForm();
    this.render();
    this.getTemplateMaster();
  }

  resetForm(): void {
    this.formFilter.patchValue({
      name: "",
      description: "",
      reviewer: [],
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
