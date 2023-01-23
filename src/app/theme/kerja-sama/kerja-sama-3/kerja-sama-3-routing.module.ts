import { NgModule } from "@angular/core";
import { KerjaSama3Component } from "./kerja-sama-3.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama3Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama3RoutingModule {}
