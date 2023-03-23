import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientAlergieChangeComponent } from './doktor-pacient-alergie-change.component';

describe('DoktorPacientAlergieChangeComponent', () => {
  let component: DoktorPacientAlergieChangeComponent;
  let fixture: ComponentFixture<DoktorPacientAlergieChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientAlergieChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientAlergieChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
