import { Akademik4RoutingModule } from "./akademik-4-routing.module";
import { Akademik4Component } from "./akademik-4.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik4Component],
  imports: [
    CommonModule,
    Akademik4RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik4Module {}
