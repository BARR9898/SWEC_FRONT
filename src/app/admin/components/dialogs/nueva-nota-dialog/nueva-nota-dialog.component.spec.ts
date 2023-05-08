import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNotaDialogComponent } from './nueva-nota-dialog.component';

describe('NuevaNotaDialogComponent', () => {
  let component: NuevaNotaDialogComponent;
  let fixture: ComponentFixture<NuevaNotaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaNotaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaNotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
