import { NgModule } from "@angular/core";
import { Akademik6Component } from "./akademik-6.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik6Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik6RoutingModule {}
