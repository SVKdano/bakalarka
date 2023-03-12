import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiekyPageComponent } from './lieky-page.component';

describe('LiekyPageComponent', () => {
  let component: LiekyPageComponent;
  let fixture: ComponentFixture<LiekyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiekyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiekyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
