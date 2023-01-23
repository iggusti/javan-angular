import { SDM6RoutingModule } from "./sdm-6-routing.module";
import { SDM6Component } from "./sdm-6.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM6Component],
  imports: [CommonModule, SDM6RoutingModule, DataTablesModule, SharedModule],
})
export class SDM6Module {}
