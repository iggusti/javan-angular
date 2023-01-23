import { SDM13RoutingModule } from "./sdm-13-routing.module";
import { SDM13Component } from "./sdm-13.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM13Component],
  imports: [CommonModule, SDM13RoutingModule, DataTablesModule, SharedModule],
})
export class SDM13Module {}
