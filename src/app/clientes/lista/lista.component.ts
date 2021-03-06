import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  public clientes: Cliente[];
  errorMessage: string;
  mostrarImagem = false;
  
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
        cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      alternarImagem() {
        this.mostrarImagem = !this.mostrarImagem;
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
      