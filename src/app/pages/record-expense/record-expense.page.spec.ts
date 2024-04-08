import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordExpensePage } from './record-expense.page';

describe('RecordExpensePage', () => {
  let component: RecordExpensePage;
  let fixture: ComponentFixture<RecordExpensePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
