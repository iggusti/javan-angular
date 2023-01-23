import { NgModule } from "@angular/core";
import { KerjaSama7Component } from "./kerja-sama-7.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama7Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama7RoutingModule {}
