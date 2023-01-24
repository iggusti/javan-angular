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
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  public loadCard: boolean = false;
  public loadingForm: boolean = false;
  public id: number;

  constructor(
    private fb: FormBuilder,
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

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    if (this.id === -1) {
      this.router.navigate(["/javan/list"]);
    }
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
