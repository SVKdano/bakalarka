import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorProfileComponent } from './doktor-profile.component';

describe('DoktorProfileComponent', () => {
  let component: DoktorProfileComponent;
  let fixture: ComponentFixture<DoktorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
