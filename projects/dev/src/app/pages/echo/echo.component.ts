import { Component, OnInit } from '@angular/core';
import { replaceAll } from 'projects/packages/string/utils';
import { TTLCache } from 'projects/packages/cache/ttl';

@Component({
  selector: 'lib-echo',
  templateUrl: './echo.component.html',
  styleUrls: ['./echo.component.scss'],
})
export class EchoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const ttl = new TTLCache();
    ttl.set('key1', { foo: 'bar' }, 1000);
    console.log(ttl.get('key1'));
  }
}
