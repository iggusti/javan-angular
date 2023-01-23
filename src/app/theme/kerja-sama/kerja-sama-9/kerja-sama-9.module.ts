import { KerjaSama9RoutingModule } from "./kerja-sama-9-routing.module";
import { KerjaSama9Component } from "./kerja-sama-9.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama9Component],
  imports: [
    CommonModule,
    KerjaSama9RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama9Module {}
