import { NgModule } from "@angular/core";
import { SDM6Component } from "./sdm-6.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM6Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM6RoutingModule {}
