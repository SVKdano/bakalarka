import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmenaHeslaDoktorComponent } from './zmena-hesla-doktor.component';

describe('ZmenaHeslaDoktorComponent', () => {
  let component: ZmenaHeslaDoktorComponent;
  let fixture: ComponentFixture<ZmenaHeslaDoktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmenaHeslaDoktorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmenaHeslaDoktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
