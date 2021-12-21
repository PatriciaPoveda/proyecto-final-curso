import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  titulo: string = 'Inicia sesión en la App';
  usuario: Usuario = new Usuario();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.token) {
      swal(
        'Login',
        `${this.authService.usuario.username} ya está logeado!`,
        'info'
      );
      this.router.navigate(['/libros-leidos']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(
      (response) => {
        console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;

        this.router.navigate(['/libros-leidos']);
        swal(
          'Login',
          `${usuario.username} ha iniciado sesión con éxito!`,
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );
  }
}
