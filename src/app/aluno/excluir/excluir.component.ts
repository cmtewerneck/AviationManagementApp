import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Aluno } from '../models/Aluno';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;

  aluno: Aluno;
  errors: any[] = [];
  
  constructor(private alunoService: AlunoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.aluno = this.route.snapshot.data['aluno'];
  }

  public excluirAluno() {
    this.alunoService.ExcluirAluno(this.aluno.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Aluno excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/alunos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

