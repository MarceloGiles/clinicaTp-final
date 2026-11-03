import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clinica, Medico } from '../servicios/clinica'


@Component({
  selector: 'app-valor-consulta-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './valor-consulta-medico.html',
  styleUrl: './valor-consulta-medico.scss',
})

export class ValorConsultaMedico {
  medicos: Medico[] = [];

  medicoSeleccionado = '';
  nuevoValor = 0;
  mensaje = '';

  constructor(private clinica: Clinica, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {
    this.clinica.listarMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        this.cdr.markForCheck();
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar los médicos.';
        this.cdr.markForCheck();
      },
    });
  }

  seleccionarMedico(): void {
    this.mensaje = '';

    const medico = this.medicos.find(
      medico => medico.id === Number(this.medicoSeleccionado)
    );
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

  this.clinica
      .modificarValor(Number(this.medicoSeleccionado), Number(this.nuevoValor))
      .subscribe({
        next: () => {
          this.mensaje = 'El valor se actualizo correctamente.';
          this.cargar();
        },
        error: (err) => {
          this.mensaje = err.error?.message ?? 'No se pudo actualizar el valor.';
          this.cdr.markForCheck();
        },
      });
  
  }
 
}