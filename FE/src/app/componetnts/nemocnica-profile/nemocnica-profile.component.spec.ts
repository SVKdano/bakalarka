import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaProfileComponent } from './nemocnica-profile.component';

describe('NemocnicaProfileComponent', () => {
  let component: NemocnicaProfileComponent;
  let fixture: ComponentFixture<NemocnicaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
