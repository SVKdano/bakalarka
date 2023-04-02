import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZdielaneAlergieComponent } from './doktor-zdielane-alergie.component';

describe('DoktorZdielaneAlergieComponent', () => {
  let component: DoktorZdielaneAlergieComponent;
  let fixture: ComponentFixture<DoktorZdielaneAlergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZdielaneAlergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZdielaneAlergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
