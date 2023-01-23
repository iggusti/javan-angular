import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "1",
        loadChildren:
          "./kemahasiswaan-1/kemahasiswaan-1.module#Kemahasiswaan1Module",
        data: { animation: "1" },
      },
      {
        path: "2",
        loadChildren:
          "./kemahasiswaan-2/kemahasiswaan-2.module#Kemahasiswaan2Module",
        data: { animation: "1" },
      },
      {
        path: "3",
        loadChildren:
          "./kemahasiswaan-3/kemahasiswaan-3.module#Kemahasiswaan3Module",
        data: { animation: "1" },
      },
      {
        path: "4",
        loadChildren:
          "./kemahasiswaan-4/kemahasiswaan-4.module#Kemahasiswaan4Module",
        data: { animation: "1" },
      },
      {
        path: "5",
        loadChildren:
          "./kemahasiswaan-5/kemahasiswaan-5.module#Kemahasiswaan5Module",
        data: { animation: "1" },
      },
      {
        path: "6",
        loadChildren:
          "./kemahasiswaan-6/kemahasiswaan-6.module#Kemahasiswaan6Module",
        data: { animation: "1" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemahasiswaanRoutingModule {}
