import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientLiekyComponent } from './doktor-pacient-lieky.component';

describe('DoktorPacientLiekyComponent', () => {
  let component: DoktorPacientLiekyComponent;
  let fixture: ComponentFixture<DoktorPacientLiekyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientLiekyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientLiekyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
