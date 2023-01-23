import { AddRoutingModule } from "./add-routing.module";
import { AddComponent } from "./add.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { ToastyModule } from "ng2-toasty";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AddComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastyModule.forRoot(),
    AddRoutingModule,
    DataTablesModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class AddModule {}
