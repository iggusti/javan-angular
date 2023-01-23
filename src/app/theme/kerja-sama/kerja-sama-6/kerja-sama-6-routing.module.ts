import { NgModule } from "@angular/core";
import { KerjaSama6Component } from "./kerja-sama-6.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama6Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama6RoutingModule {}
