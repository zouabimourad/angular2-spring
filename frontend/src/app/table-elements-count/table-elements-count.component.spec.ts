/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableElementsCountComponent } from './table-elements-count.component';

describe('TableElementsCountComponent', () => {
  let component: TableElementsCountComponent;
  let fixture: ComponentFixture<TableElementsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableElementsCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableElementsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
