import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZdielaneLiekyComponent } from './doktor-zdielane-lieky.component';

describe('DoktorZdielaneLiekyComponent', () => {
  let component: DoktorZdielaneLiekyComponent;
  let fixture: ComponentFixture<DoktorZdielaneLiekyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZdielaneLiekyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZdielaneLiekyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
