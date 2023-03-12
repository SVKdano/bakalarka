import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlergieComponent } from './alergie.component';

describe('AlergieComponent', () => {
  let component: AlergieComponent;
  let fixture: ComponentFixture<AlergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
