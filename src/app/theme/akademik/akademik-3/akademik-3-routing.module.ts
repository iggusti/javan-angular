import { NgModule } from "@angular/core";
import { Akademik3Component } from "./akademik-3.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik3Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik3RoutingModule {}
