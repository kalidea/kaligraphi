export interface KalVirtualScrollConfig {

  /**
   * size of the item in the virtual Scroll
   */
  itemSize: number;

  /**
   * Height of the viewport
   */
  height: number;

  /**
   * if the number of elements in the buffer are under minbuffer, more are generated
   */
  minBufferPx?;

  /**
   * when the size of the buffer items are under minBufferPx more are generated until they reach maxBufferPx
   */
  maxBufferPx?;

  /**
   * Orientation of the virtualScroll either 'horizontal' or 'vertical'
   */
  orientation?;
}
