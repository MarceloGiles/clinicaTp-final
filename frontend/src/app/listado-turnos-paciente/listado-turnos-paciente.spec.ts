import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoTurnosPaciente } from './listado-turnos-paciente';

describe('ListadoTurnosPaciente', () => {
  let component: ListadoTurnosPaciente;
  let fixture: ComponentFixture<ListadoTurnosPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTurnosPaciente],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
