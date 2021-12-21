import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { LibroLeidoService } from '../libro-leido/libro-leido-service';
import { LibroParaLeer } from '../libro-para-leer/libro-para-leer';
import { LibroParaLeerService } from '../libro-para-leer/libro-para-leer-service';

@Component({
  selector: 'app-form-para-leer',
  templateUrl: './form-para-leer.component.html',
  styleUrls: ['./form-para-leer.component.css'],
})
export class FormParaLeerComponent implements OnInit {
  titulo: string = 'Añadir libro para leer';

  libroParaLeer: LibroParaLeer = new LibroParaLeer();

  constructor(
    private libroParaLeerService: LibroParaLeerService,
    // private libroLeidoService: LibroLeidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id')!;
      if (id) {
        this.libroParaLeerService
          .getLibroParaLeer(id)
          .subscribe((libroParaLeer) => (this.libroParaLeer = libroParaLeer));
      }
    });
  }

  public create(): void {
    console.log('Formulario Enviado');
    console.log(this.libroParaLeer);
    this.libroParaLeerService.create(this.libroParaLeer).subscribe(
      (libroParaLeer) => {
        this.router.navigate(['/libros-para-leer']);
        swal(
          'Nuevo libro',
          `El libro ${this.libroParaLeer.titulo} ha sido añadido con éxito`,
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
    console.log(this.libroParaLeer);
    this.libroParaLeerService.update(this.libroParaLeer).subscribe(
      (json) => {
        this.router.navigate(['/libros-para-leer']);
        swal('Libro Actualizado', `${this.libroParaLeer.titulo}`, 'success');
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  // updateLeido(): void {
  //   console.log(this.libroParaLeer);
  //   this.libroLeidoService.updateLeido(this.libroParaLeer).subscribe(
  //     (json) => {
  //       this.router.navigate(['/libros-para-leer']);
  //       swal('Libro Actualizado', `${this.libroParaLeer.titulo}`, 'success');
  //     },
  //     (err) => {
  //       console.error('Código del error desde el backend: ' + err.status);
  //       console.error(err.error.errors);
  //     }
  //   );
  // }
}
