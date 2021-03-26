import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlunoTurma } from '../models/AlunoTurma';
import { AlunoTurmaService } from '../services/alunoTurma.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public alunosTurmas: AlunoTurma[];
  errorMessage: string;
  
  alunoTurma: AlunoTurma;
  alunosTurmasFiltradas: AlunoTurma[];
  
  constructor(private alunoTurmaService: AlunoTurmaService,
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
      this.alunosTurmasFiltradas = this.filtroLista ? this.filtrarAlunoTurma(this.filtroLista) : this.alunosTurmas;
    }
    
    filtrarAlunoTurma(filtrarPor: string): AlunoTurma[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.alunosTurmas.filter(
        alunoTurma => alunoTurma.nomeAluno.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.alunoTurmaService.obterTodos().subscribe(
          (_alunosTurmas: AlunoTurma[]) => {
            this.alunosTurmas = _alunosTurmas;
            this.alunosTurmasFiltradas = this.alunosTurmas;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      