import { Akademik8RoutingModule } from "./akademik-8-routing.module";
import { Akademik8Component } from "./akademik-8.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik8Component],
  imports: [
    CommonModule,
    Akademik8RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik8Module {}
