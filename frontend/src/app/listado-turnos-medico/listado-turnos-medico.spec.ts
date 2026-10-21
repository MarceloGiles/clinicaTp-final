import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoTurnosMedico } from './listado-turnos-medico';

describe('ListadoTurnosMedico', () => {
  let component: ListadoTurnosMedico;
  let fixture: ComponentFixture<ListadoTurnosMedico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTurnosMedico],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosMedico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar todos los turnos si no hay fecha seleccionada', () => {
    component.fechaSeleccionada = '';

    expect(component.turnosFiltrados.length).toBe(5);
  });

  it('debe filtrar los turnos por fecha', () => {
    component.fechaSeleccionada = '2026-10-21';

    expect(component.turnosFiltrados.length).toBe(3);
    expect(
      component.turnosFiltrados.every(
        (turno) => turno.fecha === '2026-10-21',
      ),
    ).toBe(true);
  });

  it('debe devolver una lista vacía si no hay turnos para la fecha', () => {
    component.fechaSeleccionada = '2026-10-23';

    expect(component.turnosFiltrados.length).toBe(0);
  });

  it('debe marcar un turno reservado como atendido', () => {
    const turno = component.turnos.find(
      (item) => item.estado === 'Reservado',
    )!;

    component.marcarAtendido(turno);

    expect(turno.estado).toBe('Atendido');
  });

  it('debe marcar un turno reservado como ausente', () => {
    const turno = component.turnos.find(
      (item) => item.estado === 'Reservado',
    )!;

    component.marcarAusente(turno);

    expect(turno.estado).toBe('Ausente');
  });

  it('no debe cambiar un turno que ya tiene un estado final', () => {
    const turno = component.turnos.find(
      (item) => item.estado === 'Atendido',
    )!;

    component.marcarAusente(turno);

    expect(turno.estado).toBe('Atendido');
  });
});