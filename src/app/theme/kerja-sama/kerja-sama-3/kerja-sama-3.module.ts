import { KerjaSama3RoutingModule } from "./kerja-sama-3-routing.module";
import { KerjaSama3Component } from "./kerja-sama-3.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama3Component],
  imports: [
    CommonModule,
    KerjaSama3RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama3Module {}
