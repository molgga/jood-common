import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EchoComponent } from 'projects/dev/src/app/pages/echo/echo.component';

const routes: Routes = [
  {
    path: 'web',
    loadChildren: () => import('projects/dev/src/app/pages/web/web.module').then((m) => m.WebModule),
  },
  {
    path: 'echo',
    loadChildren: () => import('projects/dev/src/app/pages/echo/echo.module').then((m) => m.EchoModule),
  },
  {
    path: 'rx',
    loadChildren: () => import('projects/dev/src/app/pages/rx/rx.module').then((m) => m.RxModule),
  },
  {
    path: '**',
    component: EchoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
