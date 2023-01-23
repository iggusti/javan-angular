import { SDM2RoutingModule } from "./sdm-2-routing.module";
import { SDM2Component } from "./sdm-2.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM2Component],
  imports: [CommonModule, SDM2RoutingModule, DataTablesModule, SharedModule],
})
export class SDM2Module {}
