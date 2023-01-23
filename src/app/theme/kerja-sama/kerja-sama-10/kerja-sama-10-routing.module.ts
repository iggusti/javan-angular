import { NgModule } from "@angular/core";
import { KerjaSama10Component } from "./kerja-sama-10.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama10Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama10RoutingModule {}
