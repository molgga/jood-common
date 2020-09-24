export type TargetElement = HTMLElement;

export enum DropZoneEventType {
  DRAG_ENTER = 'DRAG_ENTER',
  DRAG_LEAVE = 'DRAG_LEAVE',
  DROP = 'DROP',
}

export interface DropZoneEvent {
  type: DropZoneEventType;
  dataTransfer?: DataTransfer;
}
