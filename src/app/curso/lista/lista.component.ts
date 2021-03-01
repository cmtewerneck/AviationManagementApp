import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Curso } from '../models/Curso';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public cursos: Curso[];
  errorMessage: string;
  
  curso: Curso;
  cursosFiltrados: Curso[];
  
  constructor(private cursoService: CursoService,
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
      this.cursosFiltrados = this.filtroLista ? this.filtrarCurso(this.filtroLista) : this.cursos;
    }
    
    filtrarCurso(filtrarPor: string): Curso[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.cursos.filter(
        curso => curso.codigo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.cursoService.obterTodos().subscribe(
          (_cursos: Curso[]) => {
            this.cursos = _cursos;
            this.cursosFiltrados = this.cursos;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
}      