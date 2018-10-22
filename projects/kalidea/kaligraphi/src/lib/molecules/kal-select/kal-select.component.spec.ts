import { async, ComponentFixture, TestBed, flush } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { KalSelectComponent } from './kal-select.component';

describe('KalSelectComponent', () => {
  let component: KalSelectComponent;
  let fixture: ComponentFixture<KalSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalSelectComponent ]
    })
    .compileComponents();
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
    expect(component).toBeTruthy();
  });

  it('Doit pouvoir sélectionner une valeur dans la liste', () => {
    const trigger = fixture.debugElement.query(By.css('mat-option')).nativeElement;
    trigger.click();
    fixture.detectChanges();
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
