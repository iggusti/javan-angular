import { Kemahasiswaan2RoutingModule } from "./kemahasiswaan-2-routing.module";
import { Kemahasiswaan2Component } from "./kemahasiswaan-2.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [Kemahasiswaan2Component],
  imports: [
    CommonModule,
    Kemahasiswaan2RoutingModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class Kemahasiswaan2Module {}
