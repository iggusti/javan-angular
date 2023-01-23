import { NgModule } from "@angular/core";
import { KerjaSama8Component } from "./kerja-sama-8.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama8Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama8RoutingModule {}
