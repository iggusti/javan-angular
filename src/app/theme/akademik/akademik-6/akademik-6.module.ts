import { Akademik6RoutingModule } from "./akademik-6-routing.module";
import { Akademik6Component } from "./akademik-6.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik6Component],
  imports: [
    CommonModule,
    Akademik6RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik6Module {}
