import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaDoktorOddelenieZmenaComponent } from './nemocnica-doktor-oddelenie-zmena.component';

describe('NemocnicaDoktorOddelenieZmenaComponent', () => {
  let component: NemocnicaDoktorOddelenieZmenaComponent;
  let fixture: ComponentFixture<NemocnicaDoktorOddelenieZmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaDoktorOddelenieZmenaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaDoktorOddelenieZmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
