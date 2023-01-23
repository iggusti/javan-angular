import { NgModule } from "@angular/core";
import { Kemahasiswaan4Component } from "./kemahasiswaan-4.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Kemahasiswaan4Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kemahasiswaan4RoutingModule {}
