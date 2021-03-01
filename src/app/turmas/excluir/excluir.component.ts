import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Turma } from '../models/Turma';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  turma: Turma;
  errors: any[] = [];
  
  constructor(private turmaService: TurmaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.turma = this.route.snapshot.data['turma'];
    }
    
    public excluirTurma() {
      this.turmaService.excluirTurma(this.turma.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Turma excluida!', 'Sucesso');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/turmas/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }