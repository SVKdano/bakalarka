import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoktorPacientAlegrgiaShareComponent } from './doktor-pacient-alegrgia-share.component';

describe('DoktorPacientAlegrgiaShareComponent', () => {
  let component: DoktorPacientAlegrgiaShareComponent;
  let fixture: ComponentFixture<DoktorPacientAlegrgiaShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoktorPacientAlegrgiaShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoktorPacientAlegrgiaShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
