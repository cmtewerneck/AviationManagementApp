/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Main2Component } from './login.component';

describe('Main2Component', () => {
  let component: Main2Component;
  let fixture: ComponentFixture<Main2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Main2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Main2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
