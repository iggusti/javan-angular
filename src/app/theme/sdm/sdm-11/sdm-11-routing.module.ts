import { NgModule } from "@angular/core";
import { SDM11Component } from "./sdm-11.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM11Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM11RoutingModule {}
