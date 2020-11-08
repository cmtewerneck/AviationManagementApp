import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContasReceber } from '../models/ContasReceber';
import { ContasReceberService } from '../services/contasReceber.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public contasReceber: ContasReceber[];
  errorMessage: string;

  contaReceber: ContasReceber;
  contasReceberFiltrados: ContasReceber[];

  constructor(private contasReceberService: ContasReceberService,
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
    this.contasReceberFiltrados = this.filtroLista ? this.filtrarContasReceber(this.filtroLista) : this.contasReceber;
  }

  filtrarContasReceber(filtrarPor: string): ContasReceber[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.contasReceber.filter(
      contasReceber => contasReceber.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.contasReceberService.obterTodos().subscribe(
      (_contasReceber: ContasReceber[]) => {
      this.contasReceber = _contasReceber;
      this.contasReceberFiltrados = this.contasReceber;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
