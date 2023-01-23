import { KerjaSama2RoutingModule } from "./kerja-sama-2-routing.module";
import { KerjaSama2Component } from "./kerja-sama-2.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [KerjaSama2Component],
  imports: [
    CommonModule,
    KerjaSama2RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class KerjaSama2Module {}
