import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { catchError, delay, Observable, of } from 'rxjs';
import { Produto } from '../model/produto';
import { Produtos } from '../service/produtos';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  imports: [MatTableModule, AsyncPipe, MatSnackBarModule, MatButtonModule, MatIconModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos$: Observable<Produto[]>;
  produtos_array: Produto[] = [];
  displayedColumns = ['nome', 'descricao', 'acao'];

  constructor(
    private produtosService: Produtos,
    public _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    produtosService.list().subscribe((p) => (this.produtos_array = p));
    this.produtos$ = produtosService
      .list()
      .pipe(delay(3000))
      .pipe(
        catchError((error) => {
          console.log(error);
          this.onError(error.message, '');
          return of([]);
        })
      );
  }

  onError(errorMessage: string, action: string) {
    this._snackBar.open(errorMessage, action, {
      duration: 3000,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onDelete(id: number) {
    this.produtosService.delete(id).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => (this.produtos$ = this.produtosService.list()),
    });
  }
  onEdit(produto_id: number) {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: { id: produto_id },
    });
  }
}
