import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './web.routing';
import { ScrollComponent } from './scroll.component';
import { VisibilityComponent } from './visibility.component';
import { DropzoneComponent } from './dropzone.component';

@NgModule({
  imports: [CommonModule, RoutingModule],
  declarations: [ScrollComponent, VisibilityComponent, DropzoneComponent],
})
export class WebModule {}
