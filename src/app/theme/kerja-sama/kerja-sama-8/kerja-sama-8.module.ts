import { KerjaSama8RoutingModule } from "./kerja-sama-8-routing.module";
import { KerjaSama8Component } from "./kerja-sama-8.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama8Component],
  imports: [
    CommonModule,
    KerjaSama8RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama8Module {}
