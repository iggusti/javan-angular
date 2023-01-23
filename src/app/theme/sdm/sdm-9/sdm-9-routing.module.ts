import { NgModule } from "@angular/core";
import { SDM9Component } from "./sdm-9.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM9Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM9RoutingModule {}
