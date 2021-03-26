import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Suprimento } from '../models/Suprimento';
import { SuprimentoService } from '../services/suprimento.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  public suprimentos: Suprimento[];
  errorMessage: string;
  mostrarImagem = false;
  
  suprimento: Suprimento;
  suprimentosFiltrados: Suprimento[];
  
  constructor(private suprimentoService: SuprimentoService,
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
      this.suprimentosFiltrados = this.filtroLista ? this.filtrarSuprimento(this.filtroLista) : this.suprimentos;
    }
    
    filtrarSuprimento(filtrarPor: string): Suprimento[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.suprimentos.filter(
        suprimento => suprimento.nomenclatura.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      alternarImagem() {
        this.mostrarImagem = !this.mostrarImagem;
      }
      
      ObterTodos() {
        this.suprimentoService.obterTodos().subscribe(
          (_suprimentos: Suprimento[]) => {
            this.suprimentos = _suprimentos;
            this.suprimentosFiltrados = this.suprimentos;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      