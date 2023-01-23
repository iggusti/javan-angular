import { NgModule } from "@angular/core";
import { Kemahasiswaan5Component } from "./kemahasiswaan-5.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: Kemahasiswaan5Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kemahasiswaan5RoutingModule {}
