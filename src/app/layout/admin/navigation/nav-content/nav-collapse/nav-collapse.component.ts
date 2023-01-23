import { BroadcasterService } from "src/app/_services/broadcaster.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { DefaultConfig } from "src/app/app-config";
import { NavigationItem } from "../../navigation";

@Component({
  selector: "app-nav-collapse",
  templateUrl: "./nav-collapse.component.html",
  styleUrls: ["./nav-collapse.component.scss"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(-100%)", display: "block" }),
        animate("250ms ease-in", style({ transform: "translateY(0%)" })),
      ]),
      transition(":leave", [
        animate("250ms ease-in", style({ transform: "translateY(-100%)" })),
      ]),
    ]),
  ],
})
export class NavCollapseComponent implements OnInit {
  public visible;
  @Input() item: NavigationItem;
  public nextConfig: any;
  public themeLayout: string;

  constructor(private broadcasterService: BroadcasterService) {
    this.visible = false;
    this.nextConfig = DefaultConfig.config;
    this.themeLayout = this.nextConfig.layout;
    broadcasterService.hideProfileMenuBroadcast$.subscribe((res) => {
      const parent = document.querySelector("#nav-link-id");
      // console.log(parent.classList.contains('pcoded-trigger'));
      // console.log(parent.parentElement);

      if (parent.parentElement.classList.contains("pcoded-trigger")) {
        setTimeout(() => {
          parent.classList.remove("pcoded-trigger");
          parent.parentElement.classList.remove("pcoded-trigger");
        }, 200);
      }
    });
  }

  ngOnInit(): void {}

  navCollapse(e) {
    this.visible = !this.visible;
    let parent = e.target;
    if (this.themeLayout === "vertical") {
      parent = parent.parentElement;
    }

    const sections = document.querySelectorAll(".pcoded-hasmenu");
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] !== parent) {
        sections[i].classList.remove("pcoded-trigger");
      }
    }

    let firstParent = parent.parentElement;
    let preParent = parent.parentElement.parentElement;
    if (firstParent.classList.contains("pcoded-hasmenu")) {
      do {
        firstParent.classList.add("pcoded-trigger");
        // firstParent.parentElement.classList.toggle('pcoded-trigger');
        firstParent = firstParent.parentElement.parentElement.parentElement;
      } while (firstParent.classList.contains("pcoded-hasmenu"));
    } else if (preParent.classList.contains("pcoded-submenu")) {
      do {
        preParent.parentElement.classList.add("pcoded-trigger");
        preParent = preParent.parentElement.parentElement.parentElement;
      } while (preParent.classList.contains("pcoded-submenu"));
    }
    parent.classList.toggle("pcoded-trigger");
  }
}