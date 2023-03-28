import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientZaznamyComponent } from './doktor-pacient-zaznamy.component';

describe('DoktorPacientZaznamyComponent', () => {
  let component: DoktorPacientZaznamyComponent;
  let fixture: ComponentFixture<DoktorPacientZaznamyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientZaznamyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientZaznamyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
