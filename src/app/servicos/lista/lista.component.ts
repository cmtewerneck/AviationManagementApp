import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Servico } from '../models/Servico';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public servicos: Servico[];
  errorMessage: string;

  servico: Servico;
  servicosFiltrados: Servico[];

  constructor(private servicoService: ServicoService,
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
    this.servicosFiltrados = this.filtroLista ? this.filtrarServico(this.filtroLista) : this.servicos;
  }

  filtrarServico(filtrarPor: string): Servico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.servicos.filter(
      servico => servico.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.servicoService.obterTodos().subscribe(
      (_servicos: Servico[]) => {
      this.servicos = _servicos;
      this.servicosFiltrados = this.servicos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
