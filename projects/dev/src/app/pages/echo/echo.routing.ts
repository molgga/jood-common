import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EchoComponent } from './echo.component';

const routes: Routes = [
  {
    path: '',
    component: EchoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
