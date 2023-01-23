import { SampleRoutingModule } from "./sample-routing.module";
import { SampleComponent } from "./sample.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SampleComponent],
  imports: [CommonModule, SampleRoutingModule, DataTablesModule, SharedModule],
})
export class SampleModule {}
