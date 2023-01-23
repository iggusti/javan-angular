import { SDM10RoutingModule } from "./sdm-10-routing.module";
import { SDM10Component } from "./sdm-10.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM10Component],
  imports: [CommonModule, SDM10RoutingModule, DataTablesModule, SharedModule],
})
export class SDM10Module {}
