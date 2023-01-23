import { NgModule } from "@angular/core";
import { SDM12Component } from "./sdm-12.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM12Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM12RoutingModule {}
