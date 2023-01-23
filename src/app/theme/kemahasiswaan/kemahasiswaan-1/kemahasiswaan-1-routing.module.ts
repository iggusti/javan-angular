import { NgModule } from "@angular/core";
import { Kemahasiswaan1Component } from "./kemahasiswaan-1.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Kemahasiswaan1Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kemahasiswaan1RoutingModule {}
