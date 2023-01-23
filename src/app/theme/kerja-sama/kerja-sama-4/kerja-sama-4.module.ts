import { KerjaSama4RoutingModule } from "./kerja-sama-4-routing.module";
import { KerjaSama4Component } from "./kerja-sama-4.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama4Component],
  imports: [
    CommonModule,
    KerjaSama4RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama4Module {}
