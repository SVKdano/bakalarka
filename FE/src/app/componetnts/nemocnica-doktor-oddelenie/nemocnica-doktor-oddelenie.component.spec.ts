import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaDoktorOddelenieComponent } from './nemocnica-doktor-oddelenie.component';

describe('NemocnicaDoktorOddelenieComponent', () => {
  let component: NemocnicaDoktorOddelenieComponent;
  let fixture: ComponentFixture<NemocnicaDoktorOddelenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaDoktorOddelenieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaDoktorOddelenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
