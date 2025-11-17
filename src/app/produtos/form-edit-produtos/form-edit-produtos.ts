import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Produtos } from '../service/produtos';

@Component({
  selector: 'app-form-edit-produtos',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-edit-produtos.html',
  styleUrl: './form-edit-produtos.css',
})
export class FormEditProdutos {
  p$: Observable<Produto>;
  form: FormGroup;
  constructor(
    private servicoProduto: Produtos,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    let id = this.route.snapshot.queryParamMap.get('id');
    this.p$ = this.servicoProduto.getOne(parseInt(id!)); // Inicialize o formulário
    this.form = this.formBuilder.group({
      nome: [null],
      descricao: [null],
    }); // Carregar os dados da API no formulário
    this.p$.subscribe((j) => {
      this.form.patchValue({
        nome: j.nome,
        descricao: j.descricao,
      });
    });
  }
}
