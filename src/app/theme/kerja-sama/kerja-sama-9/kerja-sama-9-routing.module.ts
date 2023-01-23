import { NgModule } from "@angular/core";
import { KerjaSama9Component } from "./kerja-sama-9.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama9Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama9RoutingModule {}
