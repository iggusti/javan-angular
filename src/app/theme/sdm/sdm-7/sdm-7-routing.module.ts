import { NgModule } from "@angular/core";
import { SDM7Component } from "./sdm-7.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM7Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM7RoutingModule {}
