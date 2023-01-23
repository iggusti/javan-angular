import { Akademik9RoutingModule } from "./akademik-9-routing.module";
import { Akademik9Component } from "./akademik-9.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik9Component],
  imports: [
    CommonModule,
    Akademik9RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik9Module {}
