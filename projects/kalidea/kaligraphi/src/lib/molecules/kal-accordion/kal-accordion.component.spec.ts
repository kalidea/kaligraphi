import { async, inject, TestBed } from '@angular/core/testing';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FocusMonitor } from '@angular/cdk/a11y';

import { KalAccordionComponent } from './kal-accordion.component';
import { KalExpansionPanelComponent } from './kal-expansion-panel/kal-expansion-panel.component';
import { KalExpansionPanelHeaderComponent } from './kal-expansion-panel-header/kal-expansion-panel-header.component';
import { KalAccordionModule } from './kal-accordion.module';

describe('KalAccordionComponent', () => {
  let focusMonitor: FocusMonitor;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalAccordionModule,
        BrowserAnimationsModule
      ],
      declarations: [
        SetOfItemsComponent,
        NestedPanelComponent,
      ]
    })
      .compileComponents();

    inject([FocusMonitor], (fm: FocusMonitor) => {
      focusMonitor = fm;
    })();
  }));

  it('should ensure only one item is expanded at a time', () => {
    const fixture = TestBed.createComponent(SetOfItemsComponent);
    fixture.detectChanges();

    const panelInstances = fixture.componentInstance.panels.toArray();

    panelInstances[0].expanded = true;
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('expanded');
    expect(panelInstances[1].getExpandedState()).toEqual('collapsed');

    panelInstances[1].expanded = true;
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('collapsed');
    expect(panelInstances[1].getExpandedState()).toEqual('expanded');
  });

  it('should allow multiple items to be expanded simultaneously', () => {
    const fixture = TestBed.createComponent(SetOfItemsComponent);
    fixture.componentInstance.multi = true;
    fixture.detectChanges();

    const panelInstances = fixture.componentInstance.panels.toArray();

    panelInstances[0].expanded = true;
    panelInstances[1].expanded = true;
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('expanded');
    expect(panelInstances[1].getExpandedState()).toEqual('expanded');
  });

  it('should expand or collapse all enabled items', () => {
    const fixture = TestBed.createComponent(SetOfItemsComponent);
    fixture.detectChanges();

    const panelInstances = fixture.componentInstance.panels.toArray();

    fixture.componentInstance.multi = true;
    panelInstances[1].expanded = true;
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('collapsed');
    expect(panelInstances[1].getExpandedState()).toEqual('expanded');

    fixture.componentInstance.accordion.openAll();
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('expanded');
    expect(panelInstances[1].getExpandedState()).toEqual('expanded');

    fixture.componentInstance.accordion.closeAll();
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('collapsed');
    expect(panelInstances[1].getExpandedState()).toEqual('collapsed');
  });

  it('should not expand or collapse disabled items', () => {
    const fixture = TestBed.createComponent(SetOfItemsComponent);
    fixture.detectChanges();

    const panelInstances = fixture.componentInstance.panels.toArray();

    fixture.componentInstance.multi = true;
    panelInstances[1].disabled = true;
    fixture.detectChanges();
    fixture.componentInstance.accordion.openAll();
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('expanded');
    expect(panelInstances[1].getExpandedState()).toEqual('collapsed');

    fixture.componentInstance.accordion.closeAll();
    fixture.detectChanges();
    expect(panelInstances[0].getExpandedState()).toEqual('collapsed');
    expect(panelInstances[1].getExpandedState()).toEqual('collapsed');
  });

  it('should not register nested panels to the same accordion', () => {
    const fixture = TestBed.createComponent(NestedPanelComponent);
    const innerPanel = fixture.componentInstance.innerPanel;
    const outerPanel = fixture.componentInstance.outerPanel;

    expect(innerPanel.accordion).not.toBe(outerPanel.accordion);
  });

});

@Component({
  template: `
    <kal-accordion [multiple]="multi">
      <kal-expansion-panel *ngFor="let i of [0, 1, 2, 3]">
        <kal-expansion-panel-header>Summary {{i}}</kal-expansion-panel-header>
        <p>Content</p>
      </kal-expansion-panel>
    </kal-accordion>`
})
class SetOfItemsComponent {
  @ViewChild(KalAccordionComponent) accordion: KalAccordionComponent;
  @ViewChildren(KalExpansionPanelComponent) panels: QueryList<KalExpansionPanelComponent>;
  @ViewChildren(KalExpansionPanelHeaderComponent) headers: QueryList<KalExpansionPanelHeaderComponent>;

  multi = false;
}

@Component({
  template: `
    <kal-accordion>
      <kal-expansion-panel #outerPanel>
        <kal-expansion-panel-header>Outer Panel</kal-expansion-panel-header>
        <kal-expansion-panel #innerPanel>
          <kal-expansion-panel-header>Inner Panel</kal-expansion-panel-header>
          <p>Content</p>
        </kal-expansion-panel>
      </kal-expansion-panel>
    </kal-accordion>`
})
class NestedPanelComponent {
  @ViewChild('outerPanel') outerPanel: KalExpansionPanelComponent;
  @ViewChild('innerPanel') innerPanel: KalExpansionPanelComponent;
}
