import { SDM4RoutingModule } from "./sdm-4-routing.module";
import { SDM4Component } from "./sdm-4.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM4Component],
  imports: [CommonModule, SDM4RoutingModule, DataTablesModule, SharedModule],
})
export class SDM4Module {}
