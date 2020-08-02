import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../_services/cliente.service';
import { Cliente } from 'src/app/_models/Cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  clientesFiltrados: Cliente[];

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ? this.filtrarCliente(this.filtroLista) : this.clientes;
  }

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.ObterTodos();
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
      console.log(_clientes);
    }, error => {
        console.log(error);
    });
  }

}
