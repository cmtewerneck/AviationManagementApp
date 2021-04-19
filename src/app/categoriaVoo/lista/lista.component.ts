import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaVoo } from '../models/CategoriaVoo';
import { CategoriaVooService } from '../services/categoriaVoo.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  categoriasVoos: CategoriaVoo[];
  errors: any[] = [];
  errorMessage: string;

  categoriaVoo: CategoriaVoo;
  categoriasVoosFiltrados: CategoriaVoo[];

  constructor(private categoriaVooService: CategoriaVooService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  openModal(template: any, id: string) {
    template.show();
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.categoriasVoosFiltrados = this.filtroLista ? this.filtrarCategoriaVoo(this.filtroLista) : this.categoriasVoos;
  }

  filtrarCategoriaVoo(filtrarPor: string): CategoriaVoo[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.categoriasVoos.filter(
      categoriaVoo => categoriaVoo.codigo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.categoriaVooService.obterTodos().subscribe(
      (_categoriasVoos: CategoriaVoo[]) => {
      this.categoriasVoos = _categoriasVoos;
      this.categoriasVoosFiltrados = this.categoriasVoos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }

}
