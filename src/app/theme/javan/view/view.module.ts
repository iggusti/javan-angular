import { ViewRoutingModule } from "./view-routing.module";
import { ViewComponent } from "./view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { ToastyModule } from "ng2-toasty";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ViewRoutingModule,
    DataTablesModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ViewModule {}
