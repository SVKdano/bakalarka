import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZazdielanieZaznamyComponent } from './doktor-zazdielanie-zaznamy.component';

describe('DoktorZazdielanieZaznamyComponent', () => {
  let component: DoktorZazdielanieZaznamyComponent;
  let fixture: ComponentFixture<DoktorZazdielanieZaznamyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZazdielanieZaznamyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZazdielanieZaznamyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
