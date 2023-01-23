import { KerjaSama7RoutingModule } from "./kerja-sama-7-routing.module";
import { KerjaSama7Component } from "./kerja-sama-7.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama7Component],
  imports: [
    CommonModule,
    KerjaSama7RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama7Module {}
