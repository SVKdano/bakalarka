import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNovaNemocnicaComponent } from './admin-nova-nemocnica.component';

describe('AdminNovaNemocnicaComponent', () => {
  let component: AdminNovaNemocnicaComponent;
  let fixture: ComponentFixture<AdminNovaNemocnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNovaNemocnicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNovaNemocnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
