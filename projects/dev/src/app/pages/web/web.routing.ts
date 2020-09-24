import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrollComponent } from './scroll.component';
import { VisibilityComponent } from './visibility.component';

const routes: Routes = [
  {
    path: 'scroll',
    component: ScrollComponent,
  },
  {
    path: 'visibility',
    component: VisibilityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
