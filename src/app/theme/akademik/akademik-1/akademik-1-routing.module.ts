import { NgModule } from "@angular/core";
import { Akademik1Component } from "./akademik-1.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik1Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik1RoutingModule {}
