import { SDM7RoutingModule } from "./sdm-7-routing.module";
import { SDM7Component } from "./sdm-7.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM7Component],
  imports: [CommonModule, SDM7RoutingModule, DataTablesModule, SharedModule],
})
export class SDM7Module {}
