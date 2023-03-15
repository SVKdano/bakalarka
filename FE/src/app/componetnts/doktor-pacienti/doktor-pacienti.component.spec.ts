import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientiComponent } from './doktor-pacienti.component';

describe('DoktorPacientiComponent', () => {
  let component: DoktorPacientiComponent;
  let fixture: ComponentFixture<DoktorPacientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
