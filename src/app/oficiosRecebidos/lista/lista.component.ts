import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OficioRecebido } from '../models/OficioRecebido';
import { OficioRecebidoService } from '../services/oficioRecebido.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public oficiosRecebidos: OficioRecebido[];
  errorMessage: string;

  oficioRecebido: OficioRecebido;
  oficiosRecebidosFiltrados: OficioRecebido[];

  constructor(private oficioRecebidoService: OficioRecebidoService,
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
    this.oficiosRecebidosFiltrados = this.filtroLista ? this.filtrarOficioRecebido(this.filtroLista) : this.oficiosRecebidos;
  }

  filtrarOficioRecebido(filtrarPor: string): OficioRecebido[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.oficiosRecebidos.filter(
      oficioRecebido => oficioRecebido.numeracao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.oficioRecebidoService.obterTodos().subscribe(
      (_oficiosRecebidos: OficioRecebido[]) => {
      this.oficiosRecebidos = _oficiosRecebidos;
      this.oficiosRecebidosFiltrados = this.oficiosRecebidos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
