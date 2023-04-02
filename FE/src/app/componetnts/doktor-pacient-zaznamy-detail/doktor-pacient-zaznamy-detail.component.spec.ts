import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientZaznamyDetailComponent } from './doktor-pacient-zaznamy-detail.component';

describe('DoktorPacientZaznamyDetailComponent', () => {
  let component: DoktorPacientZaznamyDetailComponent;
  let fixture: ComponentFixture<DoktorPacientZaznamyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientZaznamyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientZaznamyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
