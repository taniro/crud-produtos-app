import { Routes } from '@angular/router';
import { FormProdutos } from './produtos/form-produtos/form-produtos';
import { FormEditProdutos } from './produtos/form-edit-produtos/form-edit-produtos';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () =>
      import('./produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos),
  },
  { path: 'produtos/new', component: FormProdutos },
  { path: 'produtos/edit', component: FormEditProdutos },
];
