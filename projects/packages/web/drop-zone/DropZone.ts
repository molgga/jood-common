import { fromEvent, Subscription, Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TargetElement, DropZoneEvent, DropZoneEventType } from './types';

/**
 * 드랍존
 * @export
 * @class DropZone
 */
export class DropZone {
  constructor() {
    this.listener = new Subscription();
    this.subjectEvent = new Subject();
    this.observableEvent = this.subjectEvent.asObservable();
  }

  protected element: TargetElement;
  protected listener: Subscription;
  protected subjectEvent: Subject<DropZoneEvent>;
  protected observableEvent: Observable<DropZoneEvent>;

  init(element: TargetElement) {
    this.element = element;
    const observeDragOver = fromEvent(this.element, 'dragover').subscribe(this.onDragOver.bind(this));
    const observeDragEnter = fromEvent(this.element, 'dragenter').subscribe(this.onDragEnter.bind(this));
    const observeDragLeave = fromEvent(this.element, 'dragleave').subscribe(this.onDragLeave.bind(this));
    const observeDrop = fromEvent(this.element, 'drop').subscribe(this.onDrop.bind(this));
    this.listener.add(observeDragOver);
    this.listener.add(observeDragEnter);
    this.listener.add(observeDragLeave);
    this.listener.add(observeDrop);
  }

  protected onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  }

  protected onDragEnter(): void {
    this.subjectEvent.next({ type: DropZoneEventType.DRAG_ENTER });
  }

  protected onDragLeave(): void {
    this.subjectEvent.next({ type: DropZoneEventType.DRAG_LEAVE });
  }

  protected onDrop(evt: DragEvent): void {
    evt.preventDefault();
    this.subjectEvent.next({ type: DropZoneEventType.DROP, dataTransfer: evt.dataTransfer });
  }

  protected pipeEvent(observer: Observable<DropZoneEvent>, type: DropZoneEventType): Observable<DropZoneEvent> {
    return observer.pipe(filter((evt) => evt.type === type));
  }

  observeDragEnter(): Observable<DropZoneEvent> {
    return this.pipeEvent(this.observableEvent, DropZoneEventType.DRAG_ENTER);
  }

  observeDragLeave(): Observable<DropZoneEvent> {
    return this.pipeEvent(this.observableEvent, DropZoneEventType.DRAG_LEAVE);
  }

  observeDrop(): Observable<DropZoneEvent> {
    return this.pipeEvent(this.observableEvent, DropZoneEventType.DROP);
  }

  observeEvent(): Observable<DropZoneEvent> {
    return this.observableEvent;
  }

  destroy() {
    if (this.listener) {
      this.listener.unsubscribe();
    }
  }
}
