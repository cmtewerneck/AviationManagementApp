import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Tripulante } from '../models/Tripulante';
import { TripulanteService } from '../services/tripulante.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  mostrarImagem = false;
  
  public tripulantes: Tripulante[];
  errorMessage: string;
  
  tripulante: Tripulante;
  tripulantesFiltrados: Tripulante[];
  
  constructor(private tripulanteService: TripulanteService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.ObterTodos();
    }
    
    alternarImagem() {
      this.mostrarImagem = !this.mostrarImagem;
    }
    
    _filtroLista: string;
    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.tripulantesFiltrados = this.filtroLista ? this.filtrarTripulante(this.filtroLista) : this.tripulantes;
    }
    
    filtrarTripulante(filtrarPor: string): Tripulante[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.tripulantes.filter(
        tripulante => tripulante.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.tripulanteService.obterTodos(2).subscribe(
          (_tripulantes: Tripulante[]) => {
            this.tripulantes = _tripulantes;
            this.tripulantesFiltrados = this.tripulantes;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      