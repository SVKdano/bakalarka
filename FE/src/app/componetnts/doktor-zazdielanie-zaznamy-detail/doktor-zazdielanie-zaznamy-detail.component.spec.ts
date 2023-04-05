import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZazdielanieZaznamyDetailComponent } from './doktor-zazdielanie-zaznamy-detail.component';

describe('DoktorZazdielanieZaznamyDetailComponent', () => {
  let component: DoktorZazdielanieZaznamyDetailComponent;
  let fixture: ComponentFixture<DoktorZazdielanieZaznamyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZazdielanieZaznamyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZazdielanieZaznamyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
