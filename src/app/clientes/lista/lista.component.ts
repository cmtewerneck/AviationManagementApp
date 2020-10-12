import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public clientes: Cliente[];
  errorMessage: string;

  cliente: Cliente;
  clientesFiltrados: Cliente[];

  constructor(private clienteService: ClienteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value
    this.clientesFiltrados = this.filtroLista ? this.filtrarCliente(this.filtroLista) : this.clientes;
  }

  filtrarCliente(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.primeiroNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.clienteService.ObterTodos().subscribe(
      (_clientes: Cliente[]) => {
      this.clientes = _clientes;
      this.clientesFiltrados = this.clientes;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }
}
