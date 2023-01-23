import { EditRoutingModule } from "./edit-routing.module";
import { EditComponent } from "./edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { ToastyModule } from "ng2-toasty";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    EditRoutingModule,
    DataTablesModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class EditModule {}
