import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Estoque } from '../models/Estoque';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public estoques: Estoque[];
  errorMessage: string;
  mostrarImagem = true;

  estoque: Estoque;
  estoquesFiltrados: Estoque[];

  constructor(private estoqueService: EstoqueService,
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
    this.estoquesFiltrados = this.filtroLista ? this.filtrarEstoque(this.filtroLista) : this.estoques;
  }

  filtrarEstoque(filtrarPor: string): Estoque[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.estoques.filter(
      estoque => estoque.nomenclatura.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  ObterTodos() {
    this.estoqueService.obterTodos().subscribe(
      (_estoques: Estoque[]) => {
      this.estoques = _estoques;
      this.estoquesFiltrados = this.estoques;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
