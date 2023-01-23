import { NgModule } from "@angular/core";
import { KerjaSama1Component } from "./kerja-sama-1.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama1Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama1RoutingModule {}
