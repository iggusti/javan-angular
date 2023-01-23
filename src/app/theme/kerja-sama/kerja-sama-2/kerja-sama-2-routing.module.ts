import { NgModule } from "@angular/core";
import { KerjaSama2Component } from "./kerja-sama-2.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama2RoutingModule {}
