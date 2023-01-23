import { Akademik2RoutingModule } from "./akademik-2-routing.module";
import { Akademik2Component } from "./akademik-2.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik2Component],
  imports: [
    CommonModule,
    Akademik2RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik2Module {}
