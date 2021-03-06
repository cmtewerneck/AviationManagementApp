import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  errors: any[] = [];
  turma: Turma;
  turmasFiltradas: Turma[];
  turmaId: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private turmaService: TurmaService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.ObterTodos();
    }

    openModal(template: any, id: string) {
      template.show();
      this.turmaId = id;
      console.log(this.turmaId);
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
          (_turmas: Turma[]) => {
            this.turmas = _turmas;
            this.turmasFiltradas = this.turmas;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }


        encerrarTurma(template: any) {
          console.log("ID sendo enviado: " + this.turmaId);
          this.turmaService.encerrarTurma(this.turmaId)
          .subscribe(
            turma => {
              //const index = this.turmas.findIndex(x => x.id == this.turmaId);
              //this.turmas = this.turmas.splice(index, 1, turma);
              this.sucessoExclusao(turma);
            },
            error => { this.falha(error) }
          )
          template.hide();
        }

        reabrirTurma(template: any) {
          console.log("ID sendo enviado: " + this.turmaId);
          this.turmaService.reabrirTurma(this.turmaId)
          .subscribe(
            turma => {
              //const index = this.turmas.findIndex(x => x.id == this.turmaId);
              //this.turmas = this.turmas.splice(index, 1, turma);
              this.sucessoReabertura(turma);
            },
            error => { this.falha(error) }
          )
          template.hide();
        }
      
        falha(fail) {
          this.errors = fail.error.errors;
          this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
        }
      
        sucessoExclusao(evento: any) {
          this.toastr.success('Turma encerrada!', 'Sucesso!');
          this.ObterTodos();
          // if (toast) {
          //   toast.onHidden.subscribe(() => {
          //     this.router.navigate(['/turmas/listar-todos']);
          //   });
          // }
        }

        sucessoReabertura(evento: any) {
          this.toastr.success('Turma reaberta!', 'Sucesso!');
          this.ObterTodos();
          // if (toast) {
          //   toast.onHidden.subscribe(() => {
          //     this.router.navigate(['/turmas/listar-todos']);
          //   });
          // }
        }

}      