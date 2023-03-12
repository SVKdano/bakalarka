import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlergiePageComponent } from './alergie-page.component';

describe('AlergiePageComponent', () => {
  let component: AlergiePageComponent;
  let fixture: ComponentFixture<AlergiePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlergiePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlergiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
