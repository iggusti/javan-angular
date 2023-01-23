import { NgModule } from "@angular/core";
import { Kemahasiswaan6Component } from "./kemahasiswaan-6.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Kemahasiswaan6Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kemahasiswaan6RoutingModule {}
