import { Component, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ConnectedPosition, RepositionScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { KalOverlayService } from './kal-overlay.service';

@Component({
  template: `<p>test kal Overlay <p>`,
  styles: [`
    p {
      width: 200px;
    }
  `],
})
class TestOverlayComponent {
  constructor() {}
}

describe('KalOverlayService', () => {
  let kalOverlayService: KalOverlayService;
  let fixture: ComponentFixture<TestOverlayComponent>;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOverlayComponent],
      providers: [KalOverlayService, Overlay]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture =  TestBed.createComponent(TestOverlayComponent);

    elementRef = fixture.elementRef;
    kalOverlayService = TestBed.get(KalOverlayService);
    fixture.detectChanges();
  });

  it('should have been injected', () => {
    expect(kalOverlayService).toBeTruthy();
  });

  it('should create a flexiblePositionStrategy', () => {
    const positionStrategy = kalOverlayService.getFlexiblePositionStrategy(fixture.elementRef);
    expect(positionStrategy).toBeTruthy();
  });

  it('should create an overlayConfig', () => {
    const config = kalOverlayService.getOverlayConfig(kalOverlayService.getFlexiblePositionStrategy(elementRef), 200);

    expect(config).toBeTruthy();
    expect(config.hasBackdrop).toBeTruthy();
    expect(config.backdropClass).toContain('kal-overlay__transparent');
    expect(config.width).toEqual(200);
    expect(config.scrollStrategy instanceof RepositionScrollStrategy).toBeTruthy();
  });

  it('should create an overlayRef', () => {
    const config = kalOverlayService.getOverlayConfig(
      kalOverlayService.getFlexiblePositionStrategy(elementRef),
      elementRef.nativeElement.getBoundingClientRect().width,
    );
    const overlayRef = kalOverlayService.createOverlay(config);
    expect(overlayRef).toBeTruthy();
  });

});
