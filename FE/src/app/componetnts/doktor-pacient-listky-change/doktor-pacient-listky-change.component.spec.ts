import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientListkyChangeComponent } from './doktor-pacient-listky-change.component';

describe('DoktorPacientListkyChangeComponent', () => {
  let component: DoktorPacientListkyChangeComponent;
  let fixture: ComponentFixture<DoktorPacientListkyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientListkyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientListkyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
