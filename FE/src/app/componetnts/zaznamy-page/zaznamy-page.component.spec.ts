import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaznamyPageComponent } from './zaznamy-page.component';

describe('ZaznamyPageComponent', () => {
  let component: ZaznamyPageComponent;
  let fixture: ComponentFixture<ZaznamyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaznamyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaznamyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
