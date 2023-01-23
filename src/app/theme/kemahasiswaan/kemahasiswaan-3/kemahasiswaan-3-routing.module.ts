import { NgModule } from "@angular/core";
import { Kemahasiswaan3Component } from "./kemahasiswaan-3.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Kemahasiswaan3Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kemahasiswaan3RoutingModule {}
