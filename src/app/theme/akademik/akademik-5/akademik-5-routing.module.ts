import { NgModule } from "@angular/core";
import { Akademik5Component } from "./akademik-5.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Akademik5Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Akademik5RoutingModule {}
