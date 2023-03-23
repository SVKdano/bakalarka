import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerpanelDoktorpacientComponent } from './innerpanel-doktorpacient.component';

describe('InnerpanelDoktorpacientComponent', () => {
  let component: InnerpanelDoktorpacientComponent;
  let fixture: ComponentFixture<InnerpanelDoktorpacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerpanelDoktorpacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerpanelDoktorpacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
