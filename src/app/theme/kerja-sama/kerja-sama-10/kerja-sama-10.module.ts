import { KerjaSama10RoutingModule } from "./kerja-sama-10-routing.module";
import { KerjaSama10Component } from "./kerja-sama-10.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama10Component],
  imports: [
    CommonModule,
    KerjaSama10RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama10Module {}
