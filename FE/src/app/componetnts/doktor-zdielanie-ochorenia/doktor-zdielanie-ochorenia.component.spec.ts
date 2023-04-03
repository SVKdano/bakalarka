import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZdielanieOchoreniaComponent } from './doktor-zdielanie-ochorenia.component';

describe('DoktorZdielanieOchoreniaComponent', () => {
  let component: DoktorZdielanieOchoreniaComponent;
  let fixture: ComponentFixture<DoktorZdielanieOchoreniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZdielanieOchoreniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZdielanieOchoreniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
