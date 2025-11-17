import { Routes } from '@angular/router';
import { FormProdutos } from './produtos/form-produtos/form-produtos';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () =>
      import('./produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos),
  },
  { path: 'produtos/new', component: FormProdutos },
];
