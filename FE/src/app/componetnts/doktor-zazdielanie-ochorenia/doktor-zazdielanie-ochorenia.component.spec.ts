import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorZazdielanieOchoreniaComponent } from './doktor-zazdielanie-ochorenia.component';

describe('DoktorZazdielanieOchoreniaComponent', () => {
  let component: DoktorZazdielanieOchoreniaComponent;
  let fixture: ComponentFixture<DoktorZazdielanieOchoreniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorZazdielanieOchoreniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorZazdielanieOchoreniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
