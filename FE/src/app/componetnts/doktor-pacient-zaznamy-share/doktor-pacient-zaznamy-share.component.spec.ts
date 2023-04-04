import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientZaznamyShareComponent } from './doktor-pacient-zaznamy-share.component';

describe('DoktorPacientZaznamyShareComponent', () => {
  let component: DoktorPacientZaznamyShareComponent;
  let fixture: ComponentFixture<DoktorPacientZaznamyShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientZaznamyShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientZaznamyShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
