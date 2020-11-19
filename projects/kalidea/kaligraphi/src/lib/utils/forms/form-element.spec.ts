import { Component, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * create a test suite with a single test component displaying a component selector
 * @param componentSelector selector of component ( e.g: kal-checkbox )
 * @param componentClass class of component ( e.g: KalCheckbox )
 * @param imports array of imports required for this test (e.g: [KalCheckboxModule] )
 */
export function createDuplicateIdTest(
  componentSelector: string,
  componentClass: Type<any>,
  imports?: any[]) {

  const id = 'my_id';

  @Component({
    selector: 'kal-test',
    template: `<${componentSelector} id="${id}"></${componentSelector}>`
  })
  class TestComponent {}

  describe(`${componentSelector} with id provided`, () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports,
        declarations: [
          TestComponent,
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

    });

    it('should not duplicate id attribute', () => {
      const HTMLElementsWithSameId = (fixture.nativeElement as HTMLElement).querySelectorAll('#' + id);
      expect(HTMLElementsWithSameId.length).toEqual(1);
    });
  });
}

