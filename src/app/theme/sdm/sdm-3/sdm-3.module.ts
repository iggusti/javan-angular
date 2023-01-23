import { SDM3RoutingModule } from "./sdm-3-routing.module";
import { SDM3Component } from "./sdm-3.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM3Component],
  imports: [CommonModule, SDM3RoutingModule, DataTablesModule, SharedModule],
})
export class SDM3Module {}
