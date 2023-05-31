import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientResetHeslaComponent } from './pacient-reset-hesla.component';

describe('PacientResetHeslaComponent', () => {
  let component: PacientResetHeslaComponent;
  let fixture: ComponentFixture<PacientResetHeslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientResetHeslaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientResetHeslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
