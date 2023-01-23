import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "1",
        loadChildren: "./sdm-1/sdm-1.module#SDM1Module",
        data: { animation: "1" },
      },
      {
        path: "2",
        loadChildren: "./sdm-2/sdm-2.module#SDM2Module",
        data: { animation: "1" },
      },
      {
        path: "3",
        loadChildren: "./sdm-3/sdm-3.module#SDM3Module",
        data: { animation: "1" },
      },
      {
        path: "4",
        loadChildren: "./sdm-4/sdm-4.module#SDM4Module",
        data: { animation: "1" },
      },
      {
        path: "5",
        loadChildren: "./sdm-5/sdm-5.module#SDM5Module",
        data: { animation: "1" },
      },
      {
        path: "6",
        loadChildren: "./sdm-6/sdm-6.module#SDM6Module",
        data: { animation: "1" },
      },
      {
        path: "7",
        loadChildren: "./sdm-7/sdm-7.module#SDM7Module",
        data: { animation: "1" },
      },
      {
        path: "8",
        loadChildren: "./sdm-8/sdm-8.module#SDM8Module",
        data: { animation: "1" },
      },
      {
        path: "9",
        loadChildren: "./sdm-9/sdm-9.module#SDM9Module",
        data: { animation: "1" },
      },
      {
        path: "10",
        loadChildren: "./sdm-10/sdm-10.module#SDM10Module",
        data: { animation: "1" },
      },
      {
        path: "11",
        loadChildren: "./sdm-11/sdm-11.module#SDM11Module",
        data: { animation: "1" },
      },
      {
        path: "12",
        loadChildren: "./sdm-12/sdm-12.module#SDM12Module",
        data: { animation: "1" },
      },
      {
        path: "13",
        loadChildren: "./sdm-13/sdm-13.module#SDM13Module",
        data: { animation: "1" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SDMRoutingModule {}
