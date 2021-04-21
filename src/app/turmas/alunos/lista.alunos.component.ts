import { Component, Input } from '@angular/core';
import { AlunoTurma, Turma } from '../../alunosTurmas/models/AlunoTurma';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'lista-aluno',
  templateUrl: './lista.alunos.component.html'
})
export class ListaAlunosComponent {
  
  imagens: string = environment.imagensUrl;
  alunoTurma: AlunoTurma;
  alunoTurmaId: string; // PEGANDO O ID DO ALUNOTURMA QUANDO A MODAL É ABERTA PARA PASSAR PRO SERVICE
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private turmaService: TurmaService) {
      
      this.alunoTurma = this.route.snapshot.data['alunoTurma'];
    }
    
    @Input()
    //alunosTurmas: Aluno[];
    alunosTurmas: AlunoTurma[];
    
    openModal(template: any, id: string) {
      template.show();
      this.alunoTurmaId = id;
      console.log(this.alunoTurmaId);
    }
    
    aprovarAluno(template: any) {
      this.turmaService.aprovarAluno(this.alunoTurmaId)
      .subscribe(
        aluno => { 
          const index = this.alunosTurmas.findIndex(x => x.id == this.alunoTurmaId);
          this.alunosTurmas = this.alunosTurmas.splice(index, 1, aluno);
          this.processarSucesso(aluno) 
        },
        falha => { this.processarFalha(falha) }
        )
        template.hide();
     }

     reprovarAluno(template: any) {
      this.turmaService.reprovarAluno(this.alunoTurmaId)
      .subscribe(
        aluno => { 
          const index = this.alunosTurmas.findIndex(x => x.id == this.alunoTurmaId);
          this.alunosTurmas = this.alunosTurmas.splice(index, 1, aluno);
          this.processarSucesso(aluno) 
        },
        falha => { this.processarFalha(falha) }
        )
        template.hide();
     }
      
      processarSucesso(response: any) {
        this.errors = [];
        this.toastr.success('Status alterado com sucesso!', 'Sucesso!');

        this.alunoTurmaId = "";
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
        this.alunoTurmaId = "";
      }

      gerarPdf(alunoTurma: AlunoTurma) {
        const url = this.turmaService.getUrlGeracaoCertificadoAluno(alunoTurma.id);
        window.open(url);
      }

}