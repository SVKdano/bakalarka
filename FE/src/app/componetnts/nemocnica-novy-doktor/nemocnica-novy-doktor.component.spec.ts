import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemocnicaNovyDoktorComponent } from './nemocnica-novy-doktor.component';

describe('NemocnicaNovyDoktorComponent', () => {
  let component: NemocnicaNovyDoktorComponent;
  let fixture: ComponentFixture<NemocnicaNovyDoktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemocnicaNovyDoktorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NemocnicaNovyDoktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
