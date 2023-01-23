import { SDM12RoutingModule } from "./sdm-12-routing.module";
import { SDM12Component } from "./sdm-12.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM12Component],
  imports: [CommonModule, SDM12RoutingModule, DataTablesModule, SharedModule],
})
export class SDM12Module {}
