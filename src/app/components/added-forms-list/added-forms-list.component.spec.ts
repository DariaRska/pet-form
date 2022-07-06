import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedFormsListComponent } from './added-forms-list.component';

describe('AddedFormsListComponent', () => {
  let component: AddedFormsListComponent;
  let fixture: ComponentFixture<AddedFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedFormsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
