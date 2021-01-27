import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './rx.routing';
import { DecelerateComponent } from './decelerate.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RoutingModule],
  declarations: [DecelerateComponent],
})
export class RxModule {}
