import { SDM11RoutingModule } from "./sdm-11-routing.module";
import { SDM11Component } from "./sdm-11.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM11Component],
  imports: [CommonModule, SDM11RoutingModule, DataTablesModule, SharedModule],
})
export class SDM11Module {}
