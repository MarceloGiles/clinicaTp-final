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
});
