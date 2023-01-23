import { KerjaSama5RoutingModule } from "./kerja-sama-5-routing.module";
import { KerjaSama5Component } from "./kerja-sama-5.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama5Component],
  imports: [
    CommonModule,
    KerjaSama5RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama5Module {}
