import { NgModule } from "@angular/core";
import { SDM10Component } from "./sdm-10.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SDM10Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDM10RoutingModule {}
