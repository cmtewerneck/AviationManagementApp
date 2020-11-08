import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Legislacao } from '../models/Legislacao';
import { LegislacaoService } from '../services/legislacao.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public legislacoes: Legislacao[];
  errorMessage: string;

  legislacao: Legislacao;
  legislacoesFiltrados: Legislacao[];

  constructor(private legislacaoService: LegislacaoService,
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
    this.legislacoesFiltrados = this.filtroLista ? this.filtrarLegislacao(this.filtroLista) : this.legislacoes;
  }

  filtrarLegislacao(filtrarPor: string): Legislacao[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.legislacoes.filter(
      legislacao => legislacao.titulo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.legislacaoService.obterTodos().subscribe(
      (_legislacoes: Legislacao[]) => {
      this.legislacoes = _legislacoes;
      this.legislacoesFiltrados = this.legislacoes;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
