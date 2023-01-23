import { Kemahasiswaan4RoutingModule } from "./kemahasiswaan-4-routing.module";
import { Kemahasiswaan4Component } from "./kemahasiswaan-4.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Kemahasiswaan4Component],
  imports: [
    CommonModule,
    Kemahasiswaan4RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Kemahasiswaan4Module {}
