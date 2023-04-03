import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientLiekyShareComponent } from './doktor-pacient-lieky-share.component';

describe('DoktorPacientLiekyShareComponent', () => {
  let component: DoktorPacientLiekyShareComponent;
  let fixture: ComponentFixture<DoktorPacientLiekyShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientLiekyShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientLiekyShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
