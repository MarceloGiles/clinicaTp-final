import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Medico {
  id: number;
  nombre: string;
  valorConsulta: number;
}

@Component({
  selector: 'app-valor-consulta-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './valor-consulta-medico.html',
  styleUrl: './valor-consulta-medico.scss',
})
export class ValorConsultaMedico {
  medicos: Medico[] = [
    {
      id: 1,
      nombre: 'Dr. Juan Pérez',
      valorConsulta: 15000,
    },
    {
      id: 2,
      nombre: 'Dra. María González',
      valorConsulta: 18000,
    },
    {
      id: 3,
      nombre: 'Dr. Carlos López',
      valorConsulta: 16000,
    },
  ];

  medicoSeleccionado = '';
  nuevoValor = 0;
  mensaje = '';

  seleccionarMedico(): void {
    this.mensaje = '';

    const medico = this.medicos.find(
      medico => medico.id === Number(this.medicoSeleccionado)
    );

    if (medico) {
      this.nuevoValor = medico.valorConsulta;
    } else {
      this.nuevoValor = 0;
    }
  }

  modificarValor(): void {
    this.mensaje = '';

     if (!this.medicoSeleccionado) {
    this.mensaje = 'Seleccioná un médico.';
    return;
  }

  if (!this.nuevoValor || this.nuevoValor <= 0) {
    this.mensaje = 'Ingresá un valor de consulta válido.';
    return;
  }

  const medico = this.medicos.find(
    medico => medico.id === Number(this.medicoSeleccionado)
  );

  if (!medico) {
    return;
  }

  medico.valorConsulta = Number(this.nuevoValor);

  this.mensaje = `El valor de la consulta de ${medico.nombre} fue actualizado correctamente.`;
}
 
}