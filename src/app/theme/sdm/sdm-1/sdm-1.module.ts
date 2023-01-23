import { SDM1RoutingModule } from "./sdm-1-routing.module";
import { SDM1Component } from "./sdm-1.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM1Component],
  imports: [CommonModule, SDM1RoutingModule, DataTablesModule, SharedModule],
})
export class SDM1Module {}
