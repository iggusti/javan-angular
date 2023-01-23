import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "1",
        loadChildren: "./akademik-1/akademik-1.module#Akademik1Module",
        data: { animation: "1" },
      },
      {
        path: "2",
        loadChildren: "./akademik-2/akademik-2.module#Akademik2Module",
        data: { animation: "1" },
      },
      {
        path: "3",
        loadChildren: "./akademik-3/akademik-3.module#Akademik3Module",
        data: { animation: "1" },
      },
      {
        path: "4",
        loadChildren: "./akademik-4/akademik-4.module#Akademik4Module",
        data: { animation: "1" },
      },
      {
        path: "5",
        loadChildren: "./akademik-5/akademik-5.module#Akademik5Module",
        data: { animation: "1" },
      },
      {
        path: "6",
        loadChildren: "./akademik-6/akademik-6.module#Akademik6Module",
        data: { animation: "1" },
      },
      {
        path: "7",
        loadChildren: "./akademik-7/akademik-7.module#Akademik7Module",
        data: { animation: "1" },
      },
      {
        path: "8",
        loadChildren: "./akademik-8/akademik-8.module#Akademik8Module",
        data: { animation: "1" },
      },
      {
        path: "9",
        loadChildren: "./akademik-9/akademik-9.module#Akademik9Module",
        data: { animation: "1" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AkademikRoutingModule {}
