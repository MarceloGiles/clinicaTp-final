import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValorConsultaMedico } from './valor-consulta-medico';

describe('ValorConsultaMedico', () => {
  let component: ValorConsultaMedico;
  let fixture: ComponentFixture<ValorConsultaMedico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorConsultaMedico],
    }).compileComponents();

    fixture = TestBed.createComponent(ValorConsultaMedico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
