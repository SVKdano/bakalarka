import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientHesloComponent } from './pacient-heslo.component';

describe('PacientHesloComponent', () => {
  let component: PacientHesloComponent;
  let fixture: ComponentFixture<PacientHesloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientHesloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientHesloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
