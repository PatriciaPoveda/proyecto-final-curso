import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { LibroLeido } from './libro-leido';
import { LibroLeidoService } from './libro-leido-service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-libro-leido',
  templateUrl: './libro-leido.component.html',
  styleUrls: [],
})
export class LibroLeidoComponent implements OnInit {
  libros!: LibroLeido[];

  constructor(
    private libroLeidoService: LibroLeidoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.libroLeidoService
      .getLibrosLeidos()
      .subscribe((libro) => (this.libros = libro));
  }
  delete(libro: LibroLeido): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el libro ${libro.titulo} de ${libro.autor}?`,
      type: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.libroLeidoService.delete(libro.id).subscribe(() => {
          this.libros = this.libros.filter((cli) => cli !== libro);
          swal(
            'Libro Eliminado',
            `Libro ${libro.titulo} eliminado con éxito.`,
            'success'
          );
        });
      }
    });
  }
}
// {
//   throw new Error('Function not implemented.');
// }
