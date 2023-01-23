import { NgModule } from "@angular/core";
import { Akademik9Component } from "./akademik-9.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik9Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik9RoutingModule {}
