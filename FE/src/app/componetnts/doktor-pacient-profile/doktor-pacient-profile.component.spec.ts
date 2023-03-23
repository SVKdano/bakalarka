import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientProfileComponent } from './doktor-pacient-profile.component';

describe('DoktorPacientProfileComponent', () => {
  let component: DoktorPacientProfileComponent;
  let fixture: ComponentFixture<DoktorPacientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
