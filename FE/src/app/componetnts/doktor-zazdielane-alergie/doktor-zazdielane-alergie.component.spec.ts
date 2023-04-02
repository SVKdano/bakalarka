import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZazdielaneAlergieComponent } from './doktor-zazdielane-alergie.component';

describe('DoktorZazdielaneAlergieComponent', () => {
  let component: DoktorZazdielaneAlergieComponent;
  let fixture: ComponentFixture<DoktorZazdielaneAlergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZazdielaneAlergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZazdielaneAlergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
