import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroLeido } from 'src/app/libro-leido/libro-leido';
import { LibroLeidoService } from 'src/app/libro-leido/libro-leido-service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  titulo: string = 'Añadir libro leído';

  libroLeido: LibroLeido = new LibroLeido();

  constructor(
    private libroLeidoService: LibroLeidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id')!;
      if (id) {
        this.libroLeidoService
          .getLibroLeido(id)
          .subscribe((libroLeido) => (this.libroLeido = libroLeido));
      }
    });
  }

  public create(): void {
    console.log('Formulario Enviado');
    console.log(this.libroLeido);
    this.libroLeidoService.create(this.libroLeido).subscribe(
      (libroLeido) => {
        this.router.navigate(['/libros-leidos']);
        swal(
          'Nuevo libro',
          `El libro ${this.libroLeido.titulo} ha sido añadido con éxito`,
          'success'
        );
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.libroLeido);
    this.libroLeidoService.update(this.libroLeido).subscribe(
      (json) => {
        this.router.navigate(['/libros-leidos']);
        swal('Libro Actualizado', `${this.libroLeido.titulo}`, 'success');
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
