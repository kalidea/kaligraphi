import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CdkPortal } from '@angular/cdk/portal';

import { KalSelectComponent } from './kal-select.component';
import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { KalOptionModule } from '../../atoms/kal-option/kal-option.module';

@Component({
  selector: 'kal-test-select',
  template: `
    <kal-select>
      <kal-option>Steak</kal-option>
      <kal-option>Pizza</kal-option>
    </kal-select>`
})
class TestSelectComponent {

}

fdescribe('KalSelectComponent', () => {
  let component: TestSelectComponent;
  let fixture: ComponentFixture<KalSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalSelectComponent, CdkPortal, TestSelectComponent],
      providers: [Overlay],
      imports: [KalOptionModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Doit afficher la liste d\'éléments donnée', () => {

  });

  it('Doit pouvoir sélectionner une valeur dans la liste', () => {
    
  });

  it('Doit pouvoir avoir un label par défaut', () => {

  });

  it('Doit pouvoir sélectionner plusieurs valeurs', () => {

  });

  it('Doit pouvoir selectionner une valeur lorsqu\'on utilise les flèches', () => {

  });

  it('Doit pouvoir fermer le select lorsqu\'on clique en dehors de celui ci', () => {

  });

  it('Doit sélectionner la première valeur lorsqu\'il n\'y a qu\'un seul élément', () => {

  });

});
