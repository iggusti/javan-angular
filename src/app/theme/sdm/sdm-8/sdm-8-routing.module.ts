import { NgModule } from "@angular/core";
import { SDM8Component } from "./sdm-8.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM8Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM8RoutingModule {}
