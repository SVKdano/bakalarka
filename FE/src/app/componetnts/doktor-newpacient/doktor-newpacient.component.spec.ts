import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorNewpacientComponent } from './doktor-newpacient.component';

describe('DoktorNewpacientComponent', () => {
  let component: DoktorNewpacientComponent;
  let fixture: ComponentFixture<DoktorNewpacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorNewpacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorNewpacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
