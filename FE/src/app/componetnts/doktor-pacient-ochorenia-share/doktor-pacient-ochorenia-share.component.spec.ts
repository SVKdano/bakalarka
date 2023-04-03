import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientOchoreniaShareComponent } from './doktor-pacient-ochorenia-share.component';

describe('DoktorPacientOchoreniaShareComponent', () => {
  let component: DoktorPacientOchoreniaShareComponent;
  let fixture: ComponentFixture<DoktorPacientOchoreniaShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientOchoreniaShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientOchoreniaShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
