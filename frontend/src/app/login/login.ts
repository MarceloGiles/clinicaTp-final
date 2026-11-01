import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  iniciarSesion(): void {
    this.mensaje = '';

    if (!this.usuario || !this.password) {
      this.mensaje = 'Completá el usuario y la contraseña.';
      return;
    }

    this.http
      .post<{ rol: string }>('/api/clinica/login', {
        usuario: this.usuario,
        clave: this.password,
      })
      .subscribe({
        next: (usuario) => {
          sessionStorage.setItem('usuario', JSON.stringify(usuario));

          const rutas: Record<string, string> = {
            ADMINISTRADOR: '/admin-turnos',
            MEDICO: '/listado-turnos-medico',
            PACIENTE: '/mis-turnos',
          };

          this.router.navigate([rutas[usuario.rol]]);
        },
        error: (err) => {
          this.mensaje = err.error?.message ?? 'Credenciales incorrectas.';
          this.cdr.markForCheck();
        },
      });git status --short | grep -v node_modules
  }
}