import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SuprimentoMovimentacao } from '../models/SuprimentoMovimentacao';
import { SuprimentoMovimentacaoService } from '../services/suprimentoMovimentacao.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  public suprimentosMovimentacao: SuprimentoMovimentacao[];
  errorMessage: string;
  mostrarImagem = true;
  
  suprimentoMovimentacao: SuprimentoMovimentacao;
  suprimentosMovimentacaoFiltrados: SuprimentoMovimentacao[];
  
  constructor(private suprimentoMovimentacaoService: SuprimentoMovimentacaoService,
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
      this.suprimentosMovimentacaoFiltrados = this.filtroLista ? this.filtrarSuprimentoMovimentacao(this.filtroLista) : this.suprimentosMovimentacao;
    }
    
    filtrarSuprimentoMovimentacao(filtrarPor: string): SuprimentoMovimentacao[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.suprimentosMovimentacao.filter(
        suprimentoMovimentacao => suprimentoMovimentacao.nomenclaturaItem.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.suprimentoMovimentacaoService.obterTodos().subscribe(
          (_suprimentosMovimentacao: SuprimentoMovimentacao[]) => {
            this.suprimentosMovimentacao = _suprimentosMovimentacao;
            this.suprimentosMovimentacaoFiltrados = this.suprimentosMovimentacao;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }