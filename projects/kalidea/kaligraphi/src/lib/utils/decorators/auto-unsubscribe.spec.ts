import { Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { AutoUnsubscribe } from './auto-unsubscribe';

@Component({
  selector: 'kal-test',
  template: '<ng-content></ng-content>'
})

export class TestComponent implements OnDestroy {

  @AutoUnsubscribe()
  subscription = interval(2).subscribe();

  @AutoUnsubscribe()
  subscriptionArray = [
    interval(2).subscribe(),
    interval(2).subscribe(),
    interval(2).subscribe(),
    interval(2).subscribe()
  ];

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
  }
}

describe('TestSelectComponent', () => {

  let component: TestComponent;

  beforeEach(() => {
    component = new TestComponent();
  });

  it('should unsubscribe single subscription on destroy', () => {
    expect(component.subscription.closed).toBeFalsy();
    component.ngOnDestroy();
    expect(component.subscription.closed).toBeTruthy();
  });


  it('should unsubscribe array of subscription on destroy', () => {
    expect(component.subscriptionArray.every( s => s.closed)).toBeFalsy();
    component.ngOnDestroy();
    expect(component.subscriptionArray.every( s => s.closed)).toBeTruthy();
  });
});

