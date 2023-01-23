import { SDM9RoutingModule } from "./sdm-9-routing.module";
import { SDM9Component } from "./sdm-9.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM9Component],
  imports: [CommonModule, SDM9RoutingModule, DataTablesModule, SharedModule],
})
export class SDM9Module {}
