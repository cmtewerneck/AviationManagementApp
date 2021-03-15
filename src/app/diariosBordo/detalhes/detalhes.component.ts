import { Component } from '@angular/core';
import { DiarioBordo } from '../models/DiarioBordo';
import { ActivatedRoute, Router } from '@angular/router';
import { DiarioBordoService } from '../services/diarioBordo.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  diarioBordo: DiarioBordo;
  errors: any[] = [];

  constructor(
    private diarioBordoService: DiarioBordoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.diarioBordo = this.route.snapshot.data['diarioBordo'];
  }

  excluirDiarioBordo(template: any) {
    this.diarioBordoService.excluirDiarioBordo(this.diarioBordo.id)
    .subscribe(
      diarioBordo => { this. sucessoExclusao(diarioBordo) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Diário excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/diarios-bordo/listar-todos']);
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