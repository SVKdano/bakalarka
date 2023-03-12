import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktoriPageComponent } from './doktori-page.component';

describe('DoktoriPageComponent', () => {
  let component: DoktoriPageComponent;
  let fixture: ComponentFixture<DoktoriPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktoriPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktoriPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
