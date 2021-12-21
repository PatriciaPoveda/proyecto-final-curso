import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { LibroParaLeer } from './libro-para-leer';
import { LibroParaLeerService } from './libro-para-leer-service';

@Component({
  selector: 'app-libro-para-leer',
  templateUrl: './libro-para-leer.component.html',
  styles: [],
})
export class LibroParaLeerComponent implements OnInit {
  librosParaLeer!: LibroParaLeer[];

  constructor(
    private libroParaLeerService: LibroParaLeerService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.libroParaLeerService
      .getLibrosParaLeer()
      .subscribe((libro) => (this.librosParaLeer = libro));
  }
  delete(libro: LibroParaLeer): void {
    swal({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el libro ${libro.titulo} de ${libro.autor}?`,
      type: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.libroParaLeerService.delete(libro.id).subscribe(() => {
          this.librosParaLeer = this.librosParaLeer.filter(
            (cli) => cli !== libro
          );
          swal(
            'Libro Eliminado!',
            `Libro ${libro.titulo} eliminado con éxito.`,
            'success'
          );
        });
      }
    });
  }
}
