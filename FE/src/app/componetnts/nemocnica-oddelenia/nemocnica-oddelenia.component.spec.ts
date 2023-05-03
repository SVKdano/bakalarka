import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaOddeleniaComponent } from './nemocnica-oddelenia.component';

describe('NemocnicaOddeleniaComponent', () => {
  let component: NemocnicaOddeleniaComponent;
  let fixture: ComponentFixture<NemocnicaOddeleniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaOddeleniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaOddeleniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
