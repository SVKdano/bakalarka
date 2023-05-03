import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaDoktoriComponent } from './nemocnica-doktori.component';

describe('NemocnicaDoktoriComponent', () => {
  let component: NemocnicaDoktoriComponent;
  let fixture: ComponentFixture<NemocnicaDoktoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaDoktoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaDoktoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
