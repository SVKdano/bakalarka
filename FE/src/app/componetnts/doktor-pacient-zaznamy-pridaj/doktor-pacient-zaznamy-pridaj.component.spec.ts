import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientZaznamyPridajComponent } from './doktor-pacient-zaznamy-pridaj.component';

describe('DoktorPacientZaznamyPridajComponent', () => {
  let component: DoktorPacientZaznamyPridajComponent;
  let fixture: ComponentFixture<DoktorPacientZaznamyPridajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientZaznamyPridajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientZaznamyPridajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
