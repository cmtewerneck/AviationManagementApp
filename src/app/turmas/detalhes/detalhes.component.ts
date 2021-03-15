import { Component } from '@angular/core';
import { Turma } from '../models/Turma';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TurmaService } from '../services/turma.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  turma: Turma;

  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private turmaService: TurmaService) {

    this.turma = this.route.snapshot.data['turma'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirTurma(template: any) {
    this.turmaService.excluirTurma(this.turma.id)
    .subscribe(
      turma => { this. sucessoExclusao(turma) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Turma excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/turmas/listar-todos']);
      });
    }
  }

}