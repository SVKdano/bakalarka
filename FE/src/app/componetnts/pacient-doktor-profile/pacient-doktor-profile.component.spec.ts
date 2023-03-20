import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientDoktorProfileComponent } from './pacient-doktor-profile.component';

describe('PacientDoktorProfileComponent', () => {
  let component: PacientDoktorProfileComponent;
  let fixture: ComponentFixture<PacientDoktorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientDoktorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientDoktorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
