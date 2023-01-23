import { Akademik1RoutingModule } from "./akademik-1-routing.module";
import { Akademik1Component } from "./akademik-1.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik1Component],
  imports: [
    CommonModule,
    Akademik1RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik1Module {}
