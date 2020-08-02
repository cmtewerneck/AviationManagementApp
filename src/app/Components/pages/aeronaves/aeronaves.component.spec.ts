/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AeronavesComponent } from './aeronaves.component';

describe('AeronavesComponent', () => {
  let component: AeronavesComponent;
  let fixture: ComponentFixture<AeronavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeronavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeronavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
