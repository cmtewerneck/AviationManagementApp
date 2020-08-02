/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FerramentariaComponent } from './ferramentaria.component';

describe('FerramentariaComponent', () => {
  let component: FerramentariaComponent;
  let fixture: ComponentFixture<FerramentariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FerramentariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FerramentariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
