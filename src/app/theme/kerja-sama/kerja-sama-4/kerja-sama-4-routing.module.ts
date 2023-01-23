import { NgModule } from "@angular/core";
import { KerjaSama4Component } from "./kerja-sama-4.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama4Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama4RoutingModule {}
