import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDoktorComponent } from './panel-doktor.component';

describe('PanelDoktorComponent', () => {
  let component: PanelDoktorComponent;
  let fixture: ComponentFixture<PanelDoktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDoktorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDoktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
