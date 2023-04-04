import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZdielaneZaznamyComponent } from './doktor-zdielane-zaznamy.component';

describe('DoktorZdielaneZaznamyComponent', () => {
  let component: DoktorZdielaneZaznamyComponent;
  let fixture: ComponentFixture<DoktorZdielaneZaznamyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZdielaneZaznamyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZdielaneZaznamyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
