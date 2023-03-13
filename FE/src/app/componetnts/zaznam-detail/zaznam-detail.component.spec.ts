import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaznamDetailComponent } from './zaznam-detail.component';

describe('ZaznamDetailComponent', () => {
  let component: ZaznamDetailComponent;
  let fixture: ComponentFixture<ZaznamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaznamDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaznamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
