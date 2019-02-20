import { Directive, ElementRef, EmbeddedViewRef, Host, Input, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { KalCarouselComponent, KalCarouselItemStatus } from './kal-carousel.component';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

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
}

const prefix = 'kalCarouselItem';

@Directive({
  selector: '[' + prefix + ']',
  exportAs: prefix,
})
export class KalCarouselItemDirective<T> implements OnInit {

  private player: AnimationPlayer;

  private animationRunning = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<CarouselContext<T>>,
    private builder: AnimationBuilder,
    private elementRef: ElementRef,
    @Host() @Optional() private carousel: KalCarouselComponent<T>) {
  }

  get currentItem() {
    return this.carousel.currentItem;
  }

  get items() {
    return this.carousel.items;
  }

  private get length() {
    return this.carousel.length;
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
      case KalCarouselItemStatus.Shift:
        // https://netbasal.com/building-a-simple-carousel-component-with-angular-3a94092b7080
        this.moveView(status);
        break;

    }
  }

  private getVariables(status: KalCarouselItemStatus): {
    positionFrom: number,
    positionTo: number,
    marginFrom: number,
    marginTo: number,
    moveAfterAnimation: boolean
  } {

    const end = this.length - 1;
    let [
      positionFrom,
      positionTo,
      marginFrom,
      marginTo,
      moveAfterAnimation
    ] = [0, end, 0, -1, true];

    if (status === KalCarouselItemStatus.Shift) {
      [
        positionFrom,
        positionTo,
        marginFrom,
        marginTo,
        moveAfterAnimation
      ] = [end, 0, -1, 0, false];
    }

    return {positionFrom, positionTo, marginFrom, marginTo, moveAfterAnimation};
  }

  private moveView(status: KalCarouselItemStatus) {

    // don't do anything until animation is done
    if (this.animationRunning) {
      return;
    }

    const {
      positionFrom,
      positionTo,
      marginFrom,
      marginTo,
      moveAfterAnimation
    } = this.getVariables(status);

    // get view ref and update context
    const viewRef = <EmbeddedViewRef<CarouselContext<T>>>this.viewContainerRef.get(positionFrom);
    viewRef.context.status = status;

    // move viewRef if needed
    if (!moveAfterAnimation) {
      this.viewContainerRef.move(viewRef, positionTo);
    }

    // get width of element
    const width = (viewRef.rootNodes[0] as HTMLElement).getBoundingClientRect().width;

    // build animation
    const myAnimation: AnimationFactory = this.builder.build([
      style({marginLeft: marginFrom * width}),
      animate(300, style({marginLeft: marginTo * width}))
    ]);


    this.createAnimation(viewRef, positionTo, moveAfterAnimation, myAnimation);

  }

  private createAnimation(viewRef, positionTo, moveAfterAnimation, animation: AnimationFactory) {

    // create player
    this.player = animation.create(viewRef.rootNodes[0]);
    this.player.onDone(() => {
      // remove viewRef if needed
      if (moveAfterAnimation) {
        this.viewContainerRef.move(viewRef, positionTo);
      }
      this.player.reset();
      this.animationRunning = false;
    });
    this.animationRunning = true;
    this.player.play();

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
