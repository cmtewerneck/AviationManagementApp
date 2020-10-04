import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../models/Produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public produtos: Produto[];
  errorMessage: string;

  produto: Produto;
  produtosFiltrados: Produto[];

  constructor(private produtoService: ProdutoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.produtosFiltrados = this.filtroLista ? this.filtrarProduto(this.filtroLista) : this.produtos;
  }

  filtrarProduto(filtrarPor: string): Produto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      produto => produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.produtoService.obterTodos().subscribe(
      (_produtos: Produto[]) => {
      this.produtos = _produtos;
      this.produtosFiltrados = this.produtos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
