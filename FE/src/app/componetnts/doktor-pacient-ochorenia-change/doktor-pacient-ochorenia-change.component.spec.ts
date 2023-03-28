import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientOchoreniaChangeComponent } from './doktor-pacient-ochorenia-change.component';

describe('DoktorPacientOchoreniaChangeComponent', () => {
  let component: DoktorPacientOchoreniaChangeComponent;
  let fixture: ComponentFixture<DoktorPacientOchoreniaChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientOchoreniaChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientOchoreniaChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
