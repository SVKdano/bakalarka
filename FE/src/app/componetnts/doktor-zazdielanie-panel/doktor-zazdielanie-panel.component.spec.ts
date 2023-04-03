import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZazdielaniePanelComponent } from './doktor-zazdielanie-panel.component';

describe('DoktorZazdielaniePanelComponent', () => {
  let component: DoktorZazdielaniePanelComponent;
  let fixture: ComponentFixture<DoktorZazdielaniePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZazdielaniePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZazdielaniePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
