import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProdutoService } from '../../_services/produto.service';
import { Produto } from 'src/app/_models/Produto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html'
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[];
  produto: Produto;
  produtosFiltrados: Produto[];
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarProduto = '';
  imagemMargem: number = 2;
  imagemLargura: number = 50;
  mostrarImagem: boolean = true;

  constructor(
    private produtoService: ProdutoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.produtosFiltrados = this.filtroLista ? this.filtrarProduto(this.filtroLista) : this.produtos;
  }

  editarProduto(produto: Produto, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.produto = produto;
    this.registerForm.patchValue(produto);
  }

  novoProduto(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirProduto(produto: Produto, template: any) {
    this.openModal(template);
    this.produto = produto;
    this.bodyDeletarProduto = `Tem certeza que deseja excluir o produto: ${produto.nome}`;
  }

  confirmeDelete(template: any) {
    this.produtoService.ExcluirProduto(this.produto.id).subscribe(
      () => {
        template.hide();
        this.ObterTodos();
        this.toastr.success('Excluido com sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar excluir');
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

  filtrarProduto(filtrarPor: string): Produto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      produto => produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      imagem: ['', Validators.nullValidator],
      valor: ['', Validators.required],
      ativo: ['', Validators.nullValidator]
    });
  }

  ObterTodos() {
    this.produtoService.ObterTodos().subscribe(
      (_produtos: Produto[]) => {
      this.produtos = _produtos;
      this.produtosFiltrados = this.produtos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error}`);
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post')
        {
          this.produto = Object.assign({}, this.registerForm.value);
          this.produtoService.AdicionarProduto(this.produto).subscribe(
            (novoProduto: Produto) => {
              template.hide();
              this.ObterTodos();
              this.toastr.success('Adicionado com sucesso');
            }, error => {
              this.toastr.error(`Erro ao adicionar: ${error}`);
              console.log(error);
            }
          );
        } else
            {
              this.produto = Object.assign({id: this.produto.id}, this.registerForm.value);
              this.produtoService.EditarProduto(this.produto).subscribe(
                () => {
                  template.hide();
                  this.ObterTodos();
                  this.toastr.success('Alterações salvas com sucesso');
                }, error => {
                  this.toastr.error(`Erro ao editar: ${error}`);
                  console.log(error);
                }
              );
            }
      }
    }
}
