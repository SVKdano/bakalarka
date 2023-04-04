import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZdielaneZaznamyDetailComponent } from './doktor-zdielane-zaznamy-detail.component';

describe('DoktorZdielaneZaznamyDetailComponent', () => {
  let component: DoktorZdielaneZaznamyDetailComponent;
  let fixture: ComponentFixture<DoktorZdielaneZaznamyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZdielaneZaznamyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZdielaneZaznamyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
