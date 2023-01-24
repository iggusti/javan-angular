import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/_services/app.service";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  public loadCard: boolean = false;
  public loadingForm: boolean = false;
  public id: number;
  public user;

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

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    if (this.id === -1) {
      this.router.navigate(["/javan/list"]);
    } else {
      this.getUser();
    }
  }

  getUser() {
    this.loadCard = true;

    this.appService.getUser(this.id).subscribe(
      (response) => {
        this.user = response;
        this.user.sex_update =
          this.user.sex === "male" ? "Male ♂️" : "Female ♀️";
        this.user.birth_date_update = this.user.birth_date.slice(0, 10);

        this.loadCard = false;
      },
      (error) => {
        console.log(error);
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
