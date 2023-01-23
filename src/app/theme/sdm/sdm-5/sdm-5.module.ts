import { SDM5RoutingModule } from "./sdm-5-routing.module";
import { SDM5Component } from "./sdm-5.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SDM5Component],
  imports: [CommonModule, SDM5RoutingModule, DataTablesModule, SharedModule],
})
export class SDM5Module {}
