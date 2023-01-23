import { SDM8RoutingModule } from "./sdm-8-routing.module";
import { SDM8Component } from "./sdm-8.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM8Component],
  imports: [CommonModule, SDM8RoutingModule, DataTablesModule, SharedModule],
})
export class SDM8Module {}
