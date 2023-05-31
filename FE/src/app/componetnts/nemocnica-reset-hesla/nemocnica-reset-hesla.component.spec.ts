import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaResetHeslaComponent } from './nemocnica-reset-hesla.component';

describe('NemocnicaResetHeslaComponent', () => {
  let component: NemocnicaResetHeslaComponent;
  let fixture: ComponentFixture<NemocnicaResetHeslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaResetHeslaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaResetHeslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
