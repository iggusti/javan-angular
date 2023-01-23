import { Kemahasiswaan6RoutingModule } from "./kemahasiswaan-6-routing.module";
import { Kemahasiswaan6Component } from "./kemahasiswaan-6.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Kemahasiswaan6Component],
  imports: [
    CommonModule,
    Kemahasiswaan6RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Kemahasiswaan6Module {}
