import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VooInstrucao } from '../models/VooInstrucao';
import { VooInstrucaoService } from '../services/vooInstrucao.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public voosInstrucao: VooInstrucao[];
  errorMessage: string;
  
  vooInstrucao: VooInstrucao;
  voosFiltrados: VooInstrucao[];
  
  constructor(private vooInstrucaoService: VooInstrucaoService,
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
      this.voosFiltrados = this.filtroLista ? this.filtrarVooInstrucao(this.filtroLista) : this.voosInstrucao;
    }
    
    filtrarVooInstrucao(filtrarPor: string): VooInstrucao[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.voosInstrucao.filter(
        vooInstrucao => vooInstrucao.nomeAluno.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.vooInstrucaoService.obterTodos().subscribe(
          (_voosInstrucao: VooInstrucao[]) => {
            this.voosInstrucao = _voosInstrucao;
            this.voosFiltrados = this.voosInstrucao;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }