import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Clinica, UsuarioLogueado } from './servicios/clinica';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  usuario: UsuarioLogueado | null = null;
  isLogin = false;
  private currentUrl = '';
  private previousUrl = '';

  constructor(private router: Router, private clinica: Clinica) {
    this.usuario = this.clinica.usuarioActual();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;
        this.isLogin = this.currentUrl.startsWith('/login');
        this.usuario = this.clinica.usuarioActual();
      });
  }

  get nombreUsuario(): string {
    if (!this.usuario) return '';
    return `${this.usuario.nombres} ${this.usuario.apellidos}`.trim();
  }

  get nombreRol(): string {
    const roles: Record<UsuarioLogueado['rol'], string> = {
      ADMINISTRADOR: 'Administración',
      MEDICO: 'Profesional',
      PACIENTE: 'Paciente',
    };
    return this.usuario ? roles[this.usuario.rol] : '';
  }

  get inicioRol(): string {
    const rutas: Record<UsuarioLogueado['rol'], string> = {
      ADMINISTRADOR: '/admin-turnos',
      MEDICO: '/listado-turnos-medico',
      PACIENTE: '/mis-turnos',
    };
    return this.usuario ? rutas[this.usuario.rol] : '/login';
  }

  volver(): void {
    const destino = this.previousUrl && !this.previousUrl.startsWith('/login')
      ? this.previousUrl
      : this.inicioRol;
    this.router.navigateByUrl(destino);
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/login']);
  }
}
