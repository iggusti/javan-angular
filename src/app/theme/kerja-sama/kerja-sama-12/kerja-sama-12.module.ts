import { KerjaSama12RoutingModule } from "./kerja-sama-12-routing.module";
import { KerjaSama12Component } from "./kerja-sama-12.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama12Component],
  imports: [
    CommonModule,
    KerjaSama12RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama12Module {}
