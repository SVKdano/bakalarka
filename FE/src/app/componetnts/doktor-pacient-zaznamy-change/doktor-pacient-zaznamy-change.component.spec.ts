import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientZaznamyChangeComponent } from './doktor-pacient-zaznamy-change.component';

describe('DoktorPacientZaznamyChangeComponent', () => {
  let component: DoktorPacientZaznamyChangeComponent;
  let fixture: ComponentFixture<DoktorPacientZaznamyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientZaznamyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientZaznamyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
