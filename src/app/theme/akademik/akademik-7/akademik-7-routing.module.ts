import { NgModule } from "@angular/core";
import { Akademik7Component } from "./akademik-7.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik7Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik7RoutingModule {}
