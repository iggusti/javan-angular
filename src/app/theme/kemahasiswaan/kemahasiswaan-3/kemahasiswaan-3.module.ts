import { Kemahasiswaan3RoutingModule } from "./kemahasiswaan-3-routing.module";
import { Kemahasiswaan3Component } from "./kemahasiswaan-3.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Kemahasiswaan3Component],
  imports: [
    CommonModule,
    Kemahasiswaan3RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Kemahasiswaan3Module {}
