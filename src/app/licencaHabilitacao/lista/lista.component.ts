import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LicencaHabilitacao } from '../models/LicencaHabilitacao';
import { LicencaHabilitacaoService } from '../services/licencaHabilitacao.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public licencasHabilitacoes: LicencaHabilitacao[];
  errorMessage: string;

  licencaHabilitacao: LicencaHabilitacao;
  licencasHabilitacoesFiltradas: LicencaHabilitacao[];

  constructor(private licencaHabilitacaoService: LicencaHabilitacaoService,
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
    this.licencasHabilitacoesFiltradas = this.filtroLista ? this.filtrarLicencaHabilitacao(this.filtroLista) : this.licencasHabilitacoes;
  }

  filtrarLicencaHabilitacao(filtrarPor: string): LicencaHabilitacao[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.licencasHabilitacoes.filter(
      licencaHabilitacao => licencaHabilitacao.nomeColaborador.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.licencaHabilitacaoService.obterTodos().subscribe(
      (_licencasHabilitacoes: LicencaHabilitacao[]) => {
      this.licencasHabilitacoes = _licencasHabilitacoes;
      this.licencasHabilitacoesFiltradas = this.licencasHabilitacoes;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
