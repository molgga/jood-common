import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './scroll.routing';
import { ScrollComponent } from './scroll.component';

@NgModule({
  imports: [CommonModule, RoutingModule],
  declarations: [ScrollComponent],
})
export class ScrollModule {}
