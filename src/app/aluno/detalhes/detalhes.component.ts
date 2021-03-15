import { Component } from '@angular/core';
import { Aluno } from '../models/Aluno';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  errors: any[] = [];

  aluno: Aluno;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private alunoService: AlunoService) {

    this.aluno = this.route.snapshot.data['aluno'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirAluno(template: any) {
    this.alunoService.ExcluirAluno(this.aluno.id)
    .subscribe(
      aluno => { this. sucessoExclusao(aluno) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Aluno excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/alunos/listar-todos']);
      });
    }
  }

}
