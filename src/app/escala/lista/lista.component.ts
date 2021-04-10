import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Escala } from '../models/Escala';
import { EscalaService } from '../services/escala.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public escalas: Escala[];
  errorMessage: string;
  
  escala: Escala;
  escalasFiltradas: Escala[];
  
  constructor(private escalaService: EscalaService,
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
      this.escalasFiltradas = this.filtroLista ? this.filtrarEscala(this.filtroLista) : this.escalas;
    }
    
    filtrarEscala(filtrarPor: string): Escala[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.escalas.filter(
        escala => escala.nomeTripulante.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.escalaService.obterTodos().subscribe(
          (_escalas: Escala[]) => {
            this.escalas = _escalas;
            this.escalasFiltradas = this.escalas;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
}      