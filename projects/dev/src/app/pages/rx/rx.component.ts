import { Component, OnInit } from '@angular/core';
import { replaceAll } from 'projects/packages/string/utils';
import { TTLCache } from 'projects/packages/cache/ttl';

@Component({
  selector: 'lib-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.scss'],
})
export class RxComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const ttl = new TTLCache();
    ttl.set('key1', { foo: 'bar' }, 1000);
    console.log(ttl.get('key1'));
  }
}
