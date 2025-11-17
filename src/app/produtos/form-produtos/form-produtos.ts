import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Produtos } from '../service/produtos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-produtos',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-produtos.html',
  styleUrl: './form-produtos.css',
})
export class FormProdutos {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: Produtos,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      nome: [null],
      descricao: [null],
    });
  }

  onSubmit() {
    this.service.create(this.form.value).subscribe({
      next: (v) => this.onSucess(),
      error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
      complete: () => console.info('complete'),
    });
  }
  onSucess() {
    this.snackBar.open('Salvo!', '', { duration: 1000 });
    this.location.back();
  }
  onCancel() {
    this.location.back();
  }
}
