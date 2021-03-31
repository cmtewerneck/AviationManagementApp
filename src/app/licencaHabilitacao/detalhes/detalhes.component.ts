import { Component } from '@angular/core';
import { LicencaHabilitacao } from '../models/LicencaHabilitacao';
import { ActivatedRoute, Router } from '@angular/router';
import { LicencaHabilitacaoService } from '../services/licencaHabilitacao.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  licencaHabilitacao: LicencaHabilitacao;
  errors: any[] = [];

  constructor(
    private licencaHabilitacaoService: LicencaHabilitacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.licencaHabilitacao = this.route.snapshot.data['licencaHabilitacao'];
  }

  excluirLicencaHabilitacao(template: any) {
    this.licencaHabilitacaoService.excluirLicencaHabilitacao(this.licencaHabilitacao.id)
    .subscribe(
      licencaHabilitacao => { this. sucessoExclusao(licencaHabilitacao) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/licencas-habilitacoes/listar-todos']);
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