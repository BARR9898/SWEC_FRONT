import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTerapeutaComponent } from './editar-terapeuta.component';

describe('EditarTerapeutaComponent', () => {
  let component: EditarTerapeutaComponent;
  let fixture: ComponentFixture<EditarTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTerapeutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
