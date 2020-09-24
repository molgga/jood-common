import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DropZone, DropZoneEventType } from 'projects/packages/web/drop-zone';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent implements OnInit {
  constructor() {}

  @ViewChild('refZone')
  refZone: ElementRef;

  listener: Subscription;
  dropZone: DropZone;

  ngOnInit() {
    this.listener = new Subscription();
  }

  ngAfterViewInit() {
    console.log(this.refZone.nativeElement);
    this.dropZone = new DropZone();
    this.dropZone.init(this.refZone.nativeElement);

    const observeEvent = this.dropZone.observeEvent().subscribe((evt) => {
      console.log('observeEvent', evt);
      switch (evt.type) {
        case DropZoneEventType.DRAG_ENTER:
          this.dropAble = true;
          break;
        case DropZoneEventType.DRAG_LEAVE:
          this.dropAble = false;
          break;
        case DropZoneEventType.DROP:
          console.log(evt.dataTransfer.files);
          break;
      }
    });
    const observeDragEnter = this.dropZone.observeDragEnter().subscribe((evt) => {
      console.log('observeDragEnter', evt);
    });
    const observeDragLeave = this.dropZone.observeDragLeave().subscribe((evt) => {
      console.log('observeDragLeave', evt);
    });
    const observeDrop = this.dropZone.observeDrop().subscribe((evt) => {
      console.log('observeDrop', evt);
    });
    this.listener.add(observeEvent);
    this.listener.add(observeDragEnter);
    this.listener.add(observeDragLeave);
    this.listener.add(observeDrop);
  }

  dropAble: boolean = false;

  get classes() {
    return {
      'drop-able': this.dropAble,
    };
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener.unsubscribe();
    }
  }
}
