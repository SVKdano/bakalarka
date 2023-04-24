import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaWelcomeComponent } from './nemocnica-welcome.component';

describe('NemocnicaWelcomeComponent', () => {
  let component: NemocnicaWelcomeComponent;
  let fixture: ComponentFixture<NemocnicaWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
