import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./layout/auth/auth.component";
import { AuthGuard, LoginGuard, RectorGuard } from "./_classes/auth.guard";
import { AdminComponent } from "./layout/admin/admin.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        loadChildren: "./theme/_home/home.module#HomeModule",
        data: { animation: "1" },
      },
      {
        path: "javan",
        loadChildren: "./theme/javan/javan.module#JavanModule",
        data: { animation: "1" },
      },
      {
        path: "akademik",
        loadChildren: "./theme/akademik/akademik.module#AkademikModule",
        data: { animation: "1" },
      },
      {
        path: "kemahasiswaan",
        loadChildren:
          "./theme/kemahasiswaan/kemahasiswaan.module#KemahasiswaanModule",
        data: { animation: "1" },
      },
      {
        path: "kerja-sama",
        loadChildren: "./theme/kerja-sama/kerja-sama.module#KerjaSamaModule",
        data: { animation: "1" },
      },
      {
        path: "sumber-daya-manusia",
        loadChildren: "./theme/sdm/sdm.module#SDMModule",
        data: { animation: "1" },
      },
      {
        path: "sample",
        loadChildren: "./theme/sample/sample.module#SampleModule",
        data: { animation: "1" },
      },
    ],
  },
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "auth",
        canActivate: [LoginGuard],
        loadChildren: "./theme/auth/authentication.module#AuthenticationModule",
      },
      {
        path: "error",
        loadChildren: "./theme/error/error.module#ErrorModule",
      },
    ],
  },
  {
    path: "redirect",
    loadChildren: "./theme/auth/redirect/redirect.module#RedirectModule",
  },
  {
    path: "**",
    redirectTo: "/error/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
