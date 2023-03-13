import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListkyPageComponent } from './listky-page.component';

describe('ListkyPageComponent', () => {
  let component: ListkyPageComponent;
  let fixture: ComponentFixture<ListkyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListkyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListkyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
