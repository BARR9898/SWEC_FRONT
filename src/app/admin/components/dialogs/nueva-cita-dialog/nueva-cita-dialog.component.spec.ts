import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCitaDialogComponent } from './nueva-cita-dialog.component';

describe('NuevaCitaDialogComponent', () => {
  let component: NuevaCitaDialogComponent;
  let fixture: ComponentFixture<NuevaCitaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaCitaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
