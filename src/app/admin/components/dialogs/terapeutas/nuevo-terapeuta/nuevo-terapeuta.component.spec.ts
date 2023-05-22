import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTerapeutaComponent } from './nuevo-terapeuta.component';

describe('NuevoTerapeutaComponent', () => {
  let component: NuevoTerapeutaComponent;
  let fixture: ComponentFixture<NuevoTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTerapeutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
