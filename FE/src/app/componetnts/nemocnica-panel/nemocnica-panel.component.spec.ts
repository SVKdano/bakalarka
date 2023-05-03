import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaPanelComponent } from './nemocnica-panel.component';

describe('NemocnicaPanelComponent', () => {
  let component: NemocnicaPanelComponent;
  let fixture: ComponentFixture<NemocnicaPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
