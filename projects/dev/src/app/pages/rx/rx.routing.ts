import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecelerateComponent } from './decelerate.component';

const routes: Routes = [
  {
    path: 'decelerate',
    component: DecelerateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
