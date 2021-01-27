import { Component, OnInit } from '@angular/core';
import { debounce } from 'projects/packages/functional/debounce';
import { decelerate } from 'projects/packages/rx/decelerate';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'lib-rx',
  templateUrl: './decelerate.component.html',
  styleUrls: ['./decelerate.component.scss'],
})
export class DecelerateComponent implements OnInit {
  constructor() {}

  testStartValue = 0;
  testEndValue = 9876543;
  testFriction = 0.2;
  testIsFloat = false;

  decelerateExec: Function = null;
  decelerate$: Subscription;

  onChangeValue(evt: Event) {
    console.log('onChangeValue');
    const val = (this.testEndValue || 0).toString();
    const float = parseFloat(val);
    const int = parseInt(val);
    this.testIsFloat = float !== int;
    this.decelerateExec();
  }

  ngOnInit() {
    this.decelerateExec = debounce(() => {
      if (this.decelerate$) {
        this.decelerate$.unsubscribe();
        this.decelerate$ = null;
      }
      this.decelerate$ = decelerate({
        start: this.testStartValue,
        end: this.testEndValue,
        friction: this.testFriction,
        delay: 0,
      }).subscribe((v) => {
        const value = v || 0;
        this.testStartValue = this.testIsFloat ? value : Math.round(value);
      });
    }, 500);
    this.decelerateExec();
  }
}
