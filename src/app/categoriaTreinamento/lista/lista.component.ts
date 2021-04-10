import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaTreinamento } from '../models/CategoriaTreinamento';
import { CategoriaTreinamentoService } from '../services/categoriaTreinamento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public categoriasTreinamentos: CategoriaTreinamento[];
  errors: any[] = [];
  errorMessage: string;

  categoriaTreinamento: CategoriaTreinamento;
  categoriasTreinamentosFiltrados: CategoriaTreinamento[];

  constructor(private categoriaTreinamentoService: CategoriaTreinamentoService,
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
    this.categoriasTreinamentosFiltrados = this.filtroLista ? this.filtrarCategoriaTreinamento(this.filtroLista) : this.categoriasTreinamentos;
  }

  filtrarCategoriaTreinamento(filtrarPor: string): CategoriaTreinamento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.categoriasTreinamentos.filter(
      categoriaTreinamento => categoriaTreinamento.codigo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.categoriaTreinamentoService.obterTodos().subscribe(
      (_categoriasTreinamentos: CategoriaTreinamento[]) => {
      this.categoriasTreinamentos = _categoriasTreinamentos;
      this.categoriasTreinamentosFiltrados = this.categoriasTreinamentos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }

}
