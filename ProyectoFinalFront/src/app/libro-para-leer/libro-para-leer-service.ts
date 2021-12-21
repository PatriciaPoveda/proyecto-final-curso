import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { LibroParaLeer } from './libro-para-leer';

@Injectable({
  providedIn: 'root',
})
export class LibroParaLeerService {
  urlEndPoint: string = 'http://localhost:8080/libros-para-leer';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private authService: AuthService) {}

  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  getLibrosParaLeer(): Observable<LibroParaLeer[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as LibroParaLeer[]));
  }
  create(libroParaLeer: LibroParaLeer): Observable<LibroParaLeer> {
    return this.http.post<LibroParaLeer>(this.urlEndPoint, libroParaLeer, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  getLibroParaLeer(id: number): Observable<LibroParaLeer> {
    return this.http.get<LibroParaLeer>(`${this.urlEndPoint}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  update(libroParaLeer: LibroParaLeer): Observable<LibroParaLeer> {
    return this.http.put<LibroParaLeer>(
      `${this.urlEndPoint}/${libroParaLeer.id}`,
      libroParaLeer,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  delete(id: number): Observable<LibroParaLeer> {
    return this.http.delete<LibroParaLeer>(`${this.urlEndPoint}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }
}
function res(res: any) {
  throw new Error('Function not implemented.');
}
