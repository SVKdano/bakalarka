import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OchoreniaPageComponent } from './ochorenia-page.component';

describe('OchoreniaPageComponent', () => {
  let component: OchoreniaPageComponent;
  let fixture: ComponentFixture<OchoreniaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OchoreniaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OchoreniaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
