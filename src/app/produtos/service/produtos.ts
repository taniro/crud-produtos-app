import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class Produtos {
  private API_URL = 'http://localhost:3000/produtos';

  constructor(private httpClient: HttpClient) {}
  list(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.API_URL).pipe(
      first(),
      tap((p) => console.log(p))
    );
  }

  create(p: Produto) {
    return this.httpClient.post<Produto>(this.API_URL, p);
  }
  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id.toString());
  }
  update(id: number, p: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(this.API_URL + '/' + id, JSON.stringify(p));
  }
  getOne(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.API_URL + '/' + id.toString);
  }
}
