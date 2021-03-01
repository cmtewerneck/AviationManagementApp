import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Turma } from '../models/Turma';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public turmas: Turma[];
  errorMessage: string;
  
  turma: Turma;
  turmasFiltradas: Turma[];
  
  constructor(private turmaService: TurmaService,
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
      this.turmasFiltradas = this.filtroLista ? this.filtrarTurma(this.filtroLista) : this.turmas;
    }
    
    filtrarTurma(filtrarPor: string): Turma[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.turmas.filter(
        turma => turma.codigo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.turmaService.obterTodos().subscribe(
          (_turmasBordo: Turma[]) => {
            this.turmas = _turmasBordo;
            this.turmasFiltradas = this.turmas;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
      }
      