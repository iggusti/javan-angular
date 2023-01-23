import { NgModule } from "@angular/core";
import { KerjaSama11Component } from "./kerja-sama-11.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama11Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama11RoutingModule {}
