import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientAlergieComponent } from './doktor-pacient-alergie.component';

describe('DoktorPacientAlergieComponent', () => {
  let component: DoktorPacientAlergieComponent;
  let fixture: ComponentFixture<DoktorPacientAlergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientAlergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientAlergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
