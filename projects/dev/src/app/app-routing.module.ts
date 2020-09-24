import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EchoComponent } from 'projects/dev/src/app/pages/echo/echo.component';

const routes: Routes = [
  {
    path: 'scroll',
    loadChildren: () => import('projects/dev/src/app/pages/scroll/scroll.module').then((m) => m.ScrollModule),
  },
  {
    path: 'echo',
    loadChildren: () => import('projects/dev/src/app/pages/echo/echo.module').then((m) => m.EchoModule),
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
