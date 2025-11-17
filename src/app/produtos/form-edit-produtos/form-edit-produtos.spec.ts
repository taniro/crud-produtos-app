import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditProdutos } from './form-edit-produtos';

describe('FormEditProdutos', () => {
  let component: FormEditProdutos;
  let fixture: ComponentFixture<FormEditProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditProdutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditProdutos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
