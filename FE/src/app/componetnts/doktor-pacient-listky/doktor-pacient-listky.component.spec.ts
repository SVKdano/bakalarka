import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientListkyComponent } from './doktor-pacient-listky.component';

describe('DoktorPacientListkyComponent', () => {
  let component: DoktorPacientListkyComponent;
  let fixture: ComponentFixture<DoktorPacientListkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientListkyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientListkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
