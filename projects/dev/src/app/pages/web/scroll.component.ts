import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserScroll, DomScroll, IScrollState } from 'projects/packages/web/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit {
  constructor() {}

  @ViewChild('refScrollDom')
  refScrollDom: ElementRef;

  listener: Subscription;

  ngOnInit() {
    this.listener = new Subscription();
    const scroll = new BrowserScroll();
    scroll.init();
    scroll.setDirectionLooseGapY(10);
    scroll.setDirectionLooseGapX(10);

    const observeScroll = scroll.observeScroll().subscribe((state) => {
      console.log('observeScroll', state);
    });
    const observeDirectionLooseY = scroll.observeDirectionLooseY().subscribe((state) => {
      console.log('observeDirectionLooseY', state);
    });
    const observeDirectionLooseX = scroll.observeDirectionLooseX().subscribe((state) => {
      console.log('observeDirectionLooseX', state);
    });
    this.listener.add(observeScroll);
    this.listener.add(observeDirectionLooseY);
    this.listener.add(observeDirectionLooseX);
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const scroll = new DomScroll();
    scroll.setElement(this.refScrollDom.nativeElement);
    scroll.init();
    scroll.observeScroll().subscribe((state) => {
      console.log('observeScroll', state);
    });
  }
}
