import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { TranslateService } from "@ngx-translate/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  public loadCard: boolean = false;
  public loadingForm: boolean = false;
  public userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    sex: new FormControl("", Validators.required),
    music: new FormControl("", Validators.required),
    birth_place: new FormControl("", Validators.required),
    birth_date: new FormControl("", Validators.required),
    zip_code: new FormControl("", Validators.required),
  });
  public listSex = [
    {
      value: "male",
      label: "Laki - laki",
    },
    {
      value: "female",
      label: "Perempuan",
    },
  ];

  constructor(
    private broadcasterService: BroadcasterService,
    public translateService: TranslateService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    translateService.setDefaultLang(localStorage.getItem("lang"));
    broadcasterService.changeLangBroadcast$.subscribe((res) => {
      translateService.setDefaultLang(res.lang);
    });
  }

  ngOnInit(): void {}

  postUser() {
    this.loadCard = true;

    const body = {
      name: this.userForm.value.name,
      sex: this.userForm.value.sex,
      music: this.userForm.value.music,
      birth_place: this.userForm.value.birth_place,
      birth_date: this.userForm.value.birth_date,
      zip_code: this.userForm.value.zip_code,
    };

    this.appService.postUser(body).subscribe(
      (response) => {
        this.userForm.reset();
        this.loadCard = false;
        this.router.navigate(["/javan/list"]);
        this.messageSuccess("User Berhasil Ditambah");
      },
      (error) => {
        console.log(error);
        this.loadCard = false;
      }
    );
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
