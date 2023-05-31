import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorResetHeslaComponent } from './doktor-reset-hesla.component';

describe('DoktorResetHeslaComponent', () => {
  let component: DoktorResetHeslaComponent;
  let fixture: ComponentFixture<DoktorResetHeslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorResetHeslaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorResetHeslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
