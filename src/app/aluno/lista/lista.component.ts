import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/Aluno';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  public alunos: Aluno[];
  errorMessage: string;
  
  mostrarImagem = true;
  
  aluno: Aluno;
  alunosFiltrados: Aluno[];
  
  constructor(private alunoService: AlunoService,
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
      this.alunosFiltrados = this.filtroLista ? this.filtrarAluno(this.filtroLista) : this.alunos;
    }
    
    filtrarAluno(filtrarPor: string): Aluno[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.alunos.filter(
        aluno => aluno.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      alternarImagem() {
        this.mostrarImagem = !this.mostrarImagem;
      }
      
      ObterTodos() {
        this.alunoService.ObterTodos().subscribe(
          (_alunos: Aluno[]) => {
            this.alunos = _alunos;
            this.alunosFiltrados = this.alunos;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      