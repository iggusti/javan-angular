import { Akademik3RoutingModule } from "./akademik-3-routing.module";
import { Akademik3Component } from "./akademik-3.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik3Component],
  imports: [
    CommonModule,
    Akademik3RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik3Module {}
