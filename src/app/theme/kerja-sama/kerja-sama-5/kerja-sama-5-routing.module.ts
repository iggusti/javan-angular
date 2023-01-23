import { NgModule } from "@angular/core";
import { KerjaSama5Component } from "./kerja-sama-5.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: KerjaSama5Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSama5RoutingModule {}
