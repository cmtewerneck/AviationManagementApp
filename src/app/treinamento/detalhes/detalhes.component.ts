import { Component } from '@angular/core';
import { Treinamento } from '../models/Treinamento';
import { ActivatedRoute, Router } from '@angular/router';
import { TreinamentoService } from '../services/treinamento.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  treinamento: Treinamento;
  errors: any[] = [];

  constructor(
    private treinamentoService: TreinamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.treinamento = this.route.snapshot.data['treinamento'];
  }

  excluirTreinamento(template: any) {
    this.treinamentoService.excluirTreinamento(this.treinamento.id)
    .subscribe(
      treinamento => { this. sucessoExclusao(treinamento) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Treinamento excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/treinamentos/listar-todos']);
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