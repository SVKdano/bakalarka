import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientProfileComponent } from './pacient-profile.component';

describe('PacientProfileComponent', () => {
  let component: PacientProfileComponent;
  let fixture: ComponentFixture<PacientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
