import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelarTurnoPaciente } from './cancelar-turno-paciente';

describe('CancelarTurnoPaciente', () => {
  let component: CancelarTurnoPaciente;
  let fixture: ComponentFixture<CancelarTurnoPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarTurnoPaciente],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelarTurnoPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
