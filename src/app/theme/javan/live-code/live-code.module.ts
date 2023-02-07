import { LiveCodeRoutingModule } from "./live-code-routing.module";
import { LiveCodeComponent } from "./live-code.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { ToastyModule } from "ng2-toasty";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [LiveCodeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastyModule.forRoot(),
    LiveCodeRoutingModule,
    DataTablesModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class LiveCodeModule {}
