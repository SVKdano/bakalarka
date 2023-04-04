import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorBoardComponent } from './doktor-board.component';

describe('DoktorBoardComponent', () => {
  let component: DoktorBoardComponent;
  let fixture: ComponentFixture<DoktorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
