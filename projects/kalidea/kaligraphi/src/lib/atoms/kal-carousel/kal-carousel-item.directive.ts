import { Directive, ElementRef, EmbeddedViewRef, Host, Input, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { KalCarouselComponent, KalCarouselItemStatus } from './kal-carousel.component';
import { animate, AnimationBuilder, AnimationFactory, style } from '@angular/animations';

class CarouselContext<T> {
  /** item value. */
  $implicit: T;

  /** The index of the item. */
  index: number;

  /** The number of _items*/
  count: number;

  /** Whether this is the first item */
  first: boolean;

  /** current status for this item **/
  status: KalCarouselItemStatus;

  /** Whether this is the last item  */
  last: boolean;

  animationDone: void;
}

const prefix = 'kalCarouselItem';

@Directive({
  selector: '[' + prefix + ']',
  exportAs: prefix,
})
export class KalCarouselItemDirective<T> implements OnInit {

  @Input()
  kalCarouselItemUseAnimation = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<CarouselContext<T>>,
    private builder: AnimationBuilder,
    private elementRef: ElementRef,
    @Host() @Optional() private carousel: KalCarouselComponent<T>) {
  }

  get start() {
    return this.carousel.start;
  }

  @Input(prefix + 'Start')
  set start(start) {
    this.carousel.start = start;
  }

  get items() {
    return this.carousel.items;
  }

  @Input(prefix + 'Of')
  set items(items) {
    this.carousel.items = items;
  }

  private get itemsOrdered(): T[] {
    const itemsList: T[] = [];
    for (let i = 0; i < this.length; i++) {
      const index = (this.length + i + this.start) % (this.length);
      itemsList[i] = this.items[index];
    }
    return itemsList;
  }

  private get length() {
    return this.items.length;
  }

  private render(status: KalCarouselItemStatus) {
    switch (status) {
      case KalCarouselItemStatus.Init:
        this.items.forEach((item: T, index: number) => {
          const context = this.editContext(item, index, status);
          this.viewContainerRef.createEmbeddedView(this.template, context);
        });
        break;
      case KalCarouselItemStatus.Append:
        this.append();
        break;
      case KalCarouselItemStatus.Shift:
        // https://netbasal.com/building-a-simple-carousel-component-with-angular-3a94092b7080
        this.shift();
        break;

    }
  }

  private append() {
    const [from, to] = [0, this.length - 1];
    const viewRef = <EmbeddedViewRef<CarouselContext<T>>>this.viewContainerRef.get(from);
    viewRef.context.status = KalCarouselItemStatus.Append;

    const myAnimation: AnimationFactory = this.builder.build([
      animate(400, style({ transform: `translateX(-100%)` }))
    ]);

    const player = myAnimation.create(viewRef.rootNodes[0]);
    player.onDone( () => {
      this.viewContainerRef.move(viewRef, to);
      player.reset();
    });
    player.play();
  }


  private shift() {
    const [from, to] = [this.length - 1, 0];
    const viewRef = <EmbeddedViewRef<CarouselContext<T>>>this.viewContainerRef.get(from);
    viewRef.context.status = KalCarouselItemStatus.Shift;

    const myAnimation: AnimationFactory = this.builder.build([
      style({ transform: `translateX(0%)`}),
      animate(400, style({ transform: `translateX(+100%)` }))
    ]);

    this.viewContainerRef.move(viewRef, to);
    const player = myAnimation.create(viewRef.rootNodes[0]);
    player.onDone( () => {
      player.reset();
    });
    player.play();
  }

  private moveView(status: KalCarouselItemStatus) {

    const end = this.length - 1;

    let animation = null;
    let from, to;

    if (status === KalCarouselItemStatus.Append) {
      // from 0 to end
      [from, to] = [0, end];
    } else {
      // from end to 0
      [from, to] = [end, 0];
    }

    const viewRef = <EmbeddedViewRef<CarouselContext<T>>>this.viewContainerRef.get(from);
    this.viewContainerRef.move(viewRef, to);

    // const sign = status === KalCarouselItemStatus.Append ? '-' : '+';
    //
    // const myAnimation : AnimationFactory = this.builder.build([
    //   animate(400, style({ transform: `translateX(${sign}25%)` }))
    // ]);
    //
    //
    // const [from, to] = status === KalCarouselItemStatus.Append ? [0, end] : [end, 0];
    // const viewRef = <EmbeddedViewRef<CarouselContext<T>>>this.viewContainerRef.get(from);
    //
    // console.log(viewRef.rootNodes[0].parentElement);
    // const player = myAnimation.create(viewRef.rootNodes[0].parentElement);
    // player.play();
    //
    // player.onDone( () => {
    //
    //   player.reset();
    // });

    viewRef.context.status = status;
  }

  private editContext(item: T,
                      index: number,
                      status: KalCarouselItemStatus = KalCarouselItemStatus.Init,
                      context: CarouselContext<T> = new CarouselContext<T>()) {
    context.$implicit = item;

    context.first = index === 0;
    context.last = index === this.length - 1;
    context.status = status;

    context.count = this.length;
    context.index = index;
    return context;
  }

  ngOnInit(): void {
    this.carousel
      .updateView$
      .subscribe((status: KalCarouselItemStatus) => {
        this.render(status);
      });
  }
}
