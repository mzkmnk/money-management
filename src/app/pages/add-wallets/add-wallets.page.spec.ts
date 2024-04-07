import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWalletsPage } from './add-wallets.page';

describe('AddWalletsPage', () => {
  let component: AddWalletsPage;
  let fixture: ComponentFixture<AddWalletsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
