import { DropZone } from "projects/packages/web/drop-zone/DropZone";

describe("DropZone", () => {
  let dropZone: DropZone;
  let element: HTMLElement;
  beforeEach(() => {
    element = document.createElement('div');
    dropZone = new DropZone();
    dropZone.init(element);
  });
  afterEach(() => {
    dropZone.destroy();
  })

  it('observe event', () => {
    let countEvent = 0;
    let countEnter = 0;
    let countLeave = 0;
    let countDrop = 0;
    dropZone.observeEvent().subscribe((evt) => {
      countEvent++;
    });
    dropZone.observeDragEnter().subscribe((evt) => {
      countEnter++;
    });
    dropZone.observeDragLeave().subscribe((evt) => {
      countLeave++;
    });
    dropZone.observeDrop().subscribe((evt) => {
      countDrop++;
    });
    const dataTransfer = new DataTransfer
    element.dispatchEvent(new DragEvent('dragover', { dataTransfer }));
    element.dispatchEvent(new DragEvent('dragenter', { dataTransfer }));
    element.dispatchEvent(new DragEvent('dragleave', { dataTransfer }));
    element.dispatchEvent(new DragEvent('drop', { dataTransfer }));
    expect(countEvent).toBe(3);
    expect(countEnter).toBe(1);
    expect(countLeave).toBe(1);
    expect(countDrop).toBe(1);
  })
});