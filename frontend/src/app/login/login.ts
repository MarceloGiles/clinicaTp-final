import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  usuario = '';
  password = '';

  mensaje = '';

  iniciarSesion(): void {
    this.mensaje = '';

    if (!this.usuario || !this.password) {
      this.mensaje = 'Completá el usuario y la contraseña.';
      return;
    }

    this.mensaje = 'Datos ingresados correctamente.';
  }
}