import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaNoveOddelenieComponent } from './nemocnica-nove-oddelenie.component';

describe('NemocnicaNoveOddelenieComponent', () => {
  let component: NemocnicaNoveOddelenieComponent;
  let fixture: ComponentFixture<NemocnicaNoveOddelenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaNoveOddelenieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaNoveOddelenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
