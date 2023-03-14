import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPanelComponent } from './doktor-panel.component';

describe('DoktorPanelComponent', () => {
  let component: DoktorPanelComponent;
  let fixture: ComponentFixture<DoktorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
