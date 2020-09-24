import { Component, OnInit } from '@angular/core';
import { PageVisibility } from 'projects/packages/web/page-visibility/PageVisibility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss'],
})
export class VisibilityComponent implements OnInit {
  constructor() {}

  listener: Subscription;
  visibility: PageVisibility;

  ngOnInit() {
    this.listener = new Subscription();
    this.visibility = new PageVisibility();
    this.visibility.init();
    const observeState = this.visibility.observeState().subscribe((state) => {
      console.log('observeState', state);
    });
    this.listener.add(observeState);
  }

  ngOnDestroy() {
    if (this.visibility) {
      this.visibility.destroy();
      this.visibility = null;
    }
    if (this.listener) {
      this.listener.unsubscribe();
      this.listener = null;
    }
  }
}
