import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientUpdateComponent } from './pacient-update.component';

describe('PacientUpdateComponent', () => {
  let component: PacientUpdateComponent;
  let fixture: ComponentFixture<PacientUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
