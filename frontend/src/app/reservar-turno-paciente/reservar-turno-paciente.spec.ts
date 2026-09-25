import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservarTurnoPaciente } from './reservar-turno-paciente';

describe('ReservarTurnoPaciente', () => {
  let component: ReservarTurnoPaciente;
  let fixture: ComponentFixture<ReservarTurnoPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarTurnoPaciente],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservarTurnoPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
