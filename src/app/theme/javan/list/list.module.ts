import { ListRoutingModule } from "./list-routing.module";
import { ListComponent } from "./list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { ToastyModule } from "ng2-toasty";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [ListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastyModule.forRoot(),
    ListRoutingModule,
    DataTablesModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class ListModule {}
