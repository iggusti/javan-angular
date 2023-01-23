import { KerjaSama6RoutingModule } from "./kerja-sama-6-routing.module";
import { KerjaSama6Component } from "./kerja-sama-6.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama6Component],
  imports: [
    CommonModule,
    KerjaSama6RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama6Module {}
