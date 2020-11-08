import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Legislacao } from '../models/Legislacao';
import { LegislacaoService } from '../services/legislacao.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  legislacao: Legislacao;
  errors: any[] = [];

  constructor(private legislacaoService: LegislacaoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.legislacao = this.route.snapshot.data['legislacao'];
  }

  public excluirLegislacao() {
    this.legislacaoService.excluirLegislacao(this.legislacao.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Legislação excluida!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/legislacoes/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

