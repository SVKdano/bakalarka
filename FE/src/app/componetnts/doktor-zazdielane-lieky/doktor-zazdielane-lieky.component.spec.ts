import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZazdielaneLiekyComponent } from './doktor-zazdielane-lieky.component';

describe('DoktorZazdielaneLiekyComponent', () => {
  let component: DoktorZazdielaneLiekyComponent;
  let fixture: ComponentFixture<DoktorZazdielaneLiekyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZazdielaneLiekyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZazdielaneLiekyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
