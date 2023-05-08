import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotaDialogComponent } from './ver-nota-dialog.component';

describe('VerNotaDialogComponent', () => {
  let component: VerNotaDialogComponent;
  let fixture: ComponentFixture<VerNotaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerNotaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerNotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
