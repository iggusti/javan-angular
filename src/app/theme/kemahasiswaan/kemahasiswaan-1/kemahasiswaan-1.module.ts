import { Kemahasiswaan1RoutingModule } from "./kemahasiswaan-1-routing.module";
import { Kemahasiswaan1Component } from "./kemahasiswaan-1.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Kemahasiswaan1Component],
  imports: [
    CommonModule,
    Kemahasiswaan1RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Kemahasiswaan1Module {}
