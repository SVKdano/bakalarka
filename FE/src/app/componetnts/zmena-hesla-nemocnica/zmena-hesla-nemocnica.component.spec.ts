import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmenaHeslaNemocnicaComponent } from './zmena-hesla-nemocnica.component';

describe('ZmenaHeslaNemocnicaComponent', () => {
  let component: ZmenaHeslaNemocnicaComponent;
  let fixture: ComponentFixture<ZmenaHeslaNemocnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZmenaHeslaNemocnicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZmenaHeslaNemocnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
