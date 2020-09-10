import { Component, ViewChild, ElementRef } from '@angular/core';

import { JdString } from 'dist/packages';
import { TTLCache } from 'dist/packages/cache';
import { toWordArray, toMaskingFirst } from 'dist/packages/string';
import { isNumber } from 'dist/packages/number';
import { toFormat } from 'dist/packages/date';
// import { BrowserScroll } from 'dist/packages/web';
import { BrowserScroll } from 'projects/packages/web/public-api';
import { DomScroll } from 'projects/packages/web/browser-scroll/DomScroll';

// import { JdString } from "@jood/common";
// import { toWordArray } from "@jood/common/string";
// import { isNumber } from "@jood/common/number";
// import { toFormat } from "@jood/common/date";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dev';

  @ViewChild('refScrollDom')
  refScrollDom: ElementRef;

  ngOnInit() {
    console.log('JdString', JdString);
    console.log('toWordArray', toWordArray('hello foo bar'));
    console.log('toMaskingFirst', toMaskingFirst('0123456789'));
    console.log('isNumber', isNumber(1));
    console.log('toFormat', toFormat(Date.now()));

    const ttl = new TTLCache();
    ttl.set('key1', { foo: 'bar' }, 1000);
    console.log(ttl.get('key1'));

    const scroll = new BrowserScroll();
    scroll.init();
    // scroll.observeScroll().subscribe((state) => {
    //   console.log('observeScroll', state);
    // });

    // scroll.observeDirectionY().subscribe((state) => {
    //   console.log('observeDirectionY', state);
    // });
    // scroll.observeDirectionX().subscribe((state) => {
    //   console.log('observeDirectionX', state);
    // });

    scroll.setDirectionLooseGapY(10);
    scroll.observeDirectionLooseY().subscribe((state) => {
      console.log('observeDirectionLooseY', state);
    });
    scroll.setDirectionLooseGapX(10);
    scroll.observeDirectionLooseX().subscribe((state) => {
      console.log('observeDirectionLooseX', state);
    });

    // scroll.observeEndY().subscribe((state) => {
    //   console.log('observeEndY', state);
    // });
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
