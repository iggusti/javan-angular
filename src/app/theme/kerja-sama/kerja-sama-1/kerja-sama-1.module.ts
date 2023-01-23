import { KerjaSama1RoutingModule } from "./kerja-sama-1-routing.module";
import { KerjaSama1Component } from "./kerja-sama-1.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama1Component],
  imports: [
    CommonModule,
    KerjaSama1RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama1Module {}
