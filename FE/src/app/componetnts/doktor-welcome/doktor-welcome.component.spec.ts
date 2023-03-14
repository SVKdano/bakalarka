import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorWelcomeComponent } from './doktor-welcome.component';

describe('DoktorWelcomeComponent', () => {
  let component: DoktorWelcomeComponent;
  let fixture: ComponentFixture<DoktorWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
