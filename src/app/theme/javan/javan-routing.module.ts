import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "list",
        loadChildren: "./list/list.module#ListModule",
        data: { animation: "2" },
      },
      {
        path: "add",
        loadChildren: "./add/add.module#AddModule",
        data: { animation: "2" },
      },
      {
        path: "edit/:id",
        loadChildren: "./edit/edit.module#EditModule",
        data: { animation: "2" },
      },
      {
        path: "view",
        loadChildren: "./view/view.module#ViewModule",
        data: { animation: "2" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JavanRoutingModule {}
