import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContasPagar } from '../models/ContasPagar';
import { ContasPagarService } from '../services/contasPagar.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public contasPagar: ContasPagar[];
  errorMessage: string;

  contaPagar: ContasPagar;
  contasPagarFiltrados: ContasPagar[];

  constructor(private contasPagarService: ContasPagarService,
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
    this.contasPagarFiltrados = this.filtroLista ? this.filtrarContasPagar(this.filtroLista) : this.contasPagar;
  }

  filtrarContasPagar(filtrarPor: string): ContasPagar[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.contasPagar.filter(
      contasPagar => contasPagar.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.contasPagarService.obterTodos().subscribe(
      (_contasPagar: ContasPagar[]) => {
      this.contasPagar = _contasPagar;
      this.contasPagarFiltrados = this.contasPagar;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
