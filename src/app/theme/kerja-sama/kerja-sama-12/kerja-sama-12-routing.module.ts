import { NgModule } from "@angular/core";
import { KerjaSama12Component } from "./kerja-sama-12.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama12Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama12RoutingModule {}
