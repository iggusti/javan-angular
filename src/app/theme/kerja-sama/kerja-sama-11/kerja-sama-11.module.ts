import { KerjaSama11RoutingModule } from "./kerja-sama-11-routing.module";
import { KerjaSama11Component } from "./kerja-sama-11.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama11Component],
  imports: [
    CommonModule,
    KerjaSama11RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama11Module {}
