import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientLiekyChangeComponent } from './doktor-pacient-lieky-change.component';

describe('DoktorPacientLiekyChangeComponent', () => {
  let component: DoktorPacientLiekyChangeComponent;
  let fixture: ComponentFixture<DoktorPacientLiekyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientLiekyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientLiekyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
