import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Motorista } from '../models/Motorista';
import { MotoristaService } from '../services/motorista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  mostrarImagem = true;
  
  public motoristas: Motorista[];
  errorMessage: string;
  
  motorista: Motorista;
  motoristasFiltrados: Motorista[];
  
  constructor(private motoristaService: MotoristaService,
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
      this.motoristasFiltrados = this.filtroLista ? this.filtrarMotorista(this.filtroLista) : this.motoristas;
    }
    
    filtrarMotorista(filtrarPor: string): Motorista[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.motoristas.filter(
        motorista => motorista.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.motoristaService.obterTodos(2).subscribe(
          (_motoristas: Motorista[]) => {
            this.motoristas = _motoristas;
            this.motoristasFiltrados = this.motoristas;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      