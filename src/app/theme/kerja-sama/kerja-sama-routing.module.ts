import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "1",
        loadChildren: "./kerja-sama-1/kerja-sama-1.module#KerjaSama1Module",
        data: { animation: "1" },
      },
      {
        path: "2",
        loadChildren: "./kerja-sama-2/kerja-sama-2.module#KerjaSama2Module",
        data: { animation: "1" },
      },
      {
        path: "3",
        loadChildren: "./kerja-sama-3/kerja-sama-3.module#KerjaSama3Module",
        data: { animation: "1" },
      },
      {
        path: "4",
        loadChildren: "./kerja-sama-4/kerja-sama-4.module#KerjaSama4Module",
        data: { animation: "1" },
      },
      {
        path: "5",
        loadChildren: "./kerja-sama-5/kerja-sama-5.module#KerjaSama5Module",
        data: { animation: "1" },
      },
      {
        path: "6",
        loadChildren: "./kerja-sama-6/kerja-sama-6.module#KerjaSama6Module",
        data: { animation: "1" },
      },
      {
        path: "7",
        loadChildren: "./kerja-sama-7/kerja-sama-7.module#KerjaSama7Module",
        data: { animation: "1" },
      },
      {
        path: "8",
        loadChildren: "./kerja-sama-8/kerja-sama-8.module#KerjaSama8Module",
        data: { animation: "1" },
      },
      {
        path: "9",
        loadChildren: "./kerja-sama-9/kerja-sama-9.module#KerjaSama9Module",
        data: { animation: "1" },
      },
      {
        path: "10",
        loadChildren: "./kerja-sama-10/kerja-sama-10.module#KerjaSama10Module",
        data: { animation: "1" },
      },
      {
        path: "11",
        loadChildren: "./kerja-sama-11/kerja-sama-11.module#KerjaSama11Module",
        data: { animation: "1" },
      },
      {
        path: "12",
        loadChildren: "./kerja-sama-12/kerja-sama-12.module#KerjaSama12Module",
        data: { animation: "1" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KerjaSamaRoutingModule {}
