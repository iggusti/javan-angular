import { Akademik7RoutingModule } from "./akademik-7-routing.module";
import { Akademik7Component } from "./akademik-7.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik7Component],
  imports: [
    CommonModule,
    Akademik7RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik7Module {}
