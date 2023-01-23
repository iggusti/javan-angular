import { NgModule } from "@angular/core";
import { SDM13Component } from "./sdm-13.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM13Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM13RoutingModule {}
