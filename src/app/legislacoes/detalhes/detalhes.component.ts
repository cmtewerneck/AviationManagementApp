import { Component } from '@angular/core';
import { Legislacao } from '../models/Legislacao';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LegislacaoService } from '../services/legislacao.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  legislacao: Legislacao;
  errors: any[] = [];

  constructor(
    private legislacaoService: LegislacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.legislacao = this.route.snapshot.data['legislacao'];
  }

  excluirLegislacao(template: any) {
    this.legislacaoService.excluirLegislacao(this.legislacao.id)
    .subscribe(
      legislacao => { this. sucessoExclusao(legislacao) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Legislação excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/legislacoes/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

}
