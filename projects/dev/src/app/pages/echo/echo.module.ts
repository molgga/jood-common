import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './echo.routing';
import { EchoComponent } from './echo.component';

@NgModule({
  imports: [CommonModule, RoutingModule],
  declarations: [EchoComponent],
})
export class EchoModule {}
