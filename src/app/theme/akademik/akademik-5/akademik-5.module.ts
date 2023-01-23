import { Akademik5RoutingModule } from "./akademik-5-routing.module";
import { Akademik5Component } from "./akademik-5.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Akademik5Component],
  imports: [
    CommonModule,
    Akademik5RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Akademik5Module {}
