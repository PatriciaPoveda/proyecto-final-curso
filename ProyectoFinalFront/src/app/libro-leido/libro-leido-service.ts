import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LibroParaLeer } from '../libro-para-leer/libro-para-leer';
import { AuthService } from '../usuarios/auth.service';
import { LibroLeido } from './libro-leido';

@Injectable({
  providedIn: 'root',
})
export class LibroLeidoService {
  urlEndPoint: string = 'http://localhost:8080/libros';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private authService: AuthService) {}

  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  getLibrosLeidos(): Observable<LibroLeido[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as LibroLeido[]));
  }
  create(libroLeido: LibroLeido): Observable<LibroLeido> {
    return this.http.post<LibroLeido>(this.urlEndPoint, libroLeido, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  getLibroLeido(id: number): Observable<LibroLeido> {
    return this.http.get<LibroLeido>(`${this.urlEndPoint}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  update(libroLeido: LibroLeido): Observable<LibroLeido> {
    return this.http.put<LibroLeido>(
      `${this.urlEndPoint}/${libroLeido.id}`,
      libroLeido,
      { headers: this.agregarAuthorizationHeader() }
    );
  }
  // updateLeido(libroParaLeer: LibroParaLeer): Observable<LibroParaLeer> {
  //   return this.http.put<LibroLeido>(
  //     `${this.urlEndPoint}/${libroParaLeer.id}`,
  //     libroParaLeer,
  //     { headers: this.agregarAuthorizationHeader() }
  //   );
  // }

  delete(id: number): Observable<LibroLeido> {
    return this.http.delete<LibroLeido>(`${this.urlEndPoint}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
function res(res: any) {
  throw new Error('Function not implemented.');
}
