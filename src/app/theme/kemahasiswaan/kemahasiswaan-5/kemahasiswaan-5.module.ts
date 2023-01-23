import { Kemahasiswaan5RoutingModule } from "./kemahasiswaan-5-routing.module";
import { Kemahasiswaan5Component } from "./kemahasiswaan-5.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Kemahasiswaan5Component],
  imports: [
    CommonModule,
    Kemahasiswaan5RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Kemahasiswaan5Module {}
