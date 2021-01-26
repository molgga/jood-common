import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './rx.routing';
import { RxComponent } from './rx.component';

@NgModule({
  imports: [CommonModule, RoutingModule],
  declarations: [RxComponent],
})
export class RxModule {}
