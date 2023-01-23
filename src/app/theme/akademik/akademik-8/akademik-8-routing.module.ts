import { NgModule } from "@angular/core";
import { Akademik8Component } from "./akademik-8.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik8Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik8RoutingModule {}
