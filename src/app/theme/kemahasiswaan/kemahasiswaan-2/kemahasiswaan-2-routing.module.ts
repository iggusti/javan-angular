import { NgModule } from "@angular/core";
import { Kemahasiswaan2Component } from "./kemahasiswaan-2.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Kemahasiswaan2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kemahasiswaan2RoutingModule {}
