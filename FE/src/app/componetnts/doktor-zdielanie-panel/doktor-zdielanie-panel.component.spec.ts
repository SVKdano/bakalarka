import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZdielaniePanelComponent } from './doktor-zdielanie-panel.component';

describe('DoktorZdielaniePanelComponent', () => {
  let component: DoktorZdielaniePanelComponent;
  let fixture: ComponentFixture<DoktorZdielaniePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZdielaniePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZdielaniePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
