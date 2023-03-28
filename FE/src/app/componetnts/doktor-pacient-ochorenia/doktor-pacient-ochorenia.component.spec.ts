import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientOchoreniaComponent } from './doktor-pacient-ochorenia.component';

describe('DoktorPacientOchoreniaComponent', () => {
  let component: DoktorPacientOchoreniaComponent;
  let fixture: ComponentFixture<DoktorPacientOchoreniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientOchoreniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientOchoreniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
