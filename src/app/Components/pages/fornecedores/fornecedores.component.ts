import { Component, OnInit, TemplateRef } from '@angular/core';
import { FornecedorService } from '../../../_services/fornecedor.service';
import { Fornecedor } from 'src/app/_models/Fornecedor';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  fornecedores: Fornecedor[];
  fornecedor: Fornecedor;
  fornecedoresFiltrados: Fornecedor[];
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarFornecedor = '';

  constructor(
    private fornecedorService: FornecedorService,
    private modalService: BsModalService,
    private fb: FormBuilder
    ) { }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.fornecedoresFiltrados = this.filtroLista ? this.filtrarFornecedor(this.filtroLista) : this.fornecedores;
  }

  editarFornecedor(fornecedor: Fornecedor, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.fornecedor = fornecedor;
    this.registerForm.patchValue(fornecedor);
  }

  novoFornecedor(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirFornecedor(fornecedor: Fornecedor, template: any) {
    this.openModal(template);
    this.fornecedor = fornecedor;
    this.bodyDeletarFornecedor = `Tem certeza que deseja excluir o fornecedor: ${fornecedor.nome}`;
  }

  confirmeDelete(template: any) {
    this.fornecedorService.ExcluirFornecedor(this.fornecedor.id).subscribe(
      () => {
        template.hide();
        this.ObterTodos();
      }, error => {
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.ObterTodos();
  }

  filtrarFornecedor(filtrarPor: string): Fornecedor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.fornecedores.filter(
      fornecedor => fornecedor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      documento: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      ativo: ['', Validators.required],
      tipoFornecedor: ['', Validators.required]
    });
  }

  ObterTodos() {
    this.fornecedorService.ObterTodos().subscribe(
      (_fornecedores: Fornecedor[]) => {
      this.fornecedores = _fornecedores;
      console.log(_fornecedores);
    }, error => {
        console.log(error);
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post')
        {
          this.fornecedor = Object.assign({}, this.registerForm.value);
          this.fornecedorService.AdicionarFornecedor(this.fornecedor).subscribe(
            (novoFornecedor: Fornecedor) => {
              template.hide();
              this.ObterTodos();
            }, error => {
              console.log(error);
            }
          );
        } else
            {
              this.fornecedor = Object.assign({id: this.fornecedor.id}, this.registerForm.value);
              this.fornecedorService.EditarFornecedor(this.fornecedor).subscribe(
                () => {
                  template.hide();
                  this.ObterTodos();
                }, error => {
                  console.log(error);
                }
              );
            }
      }
    }
}
