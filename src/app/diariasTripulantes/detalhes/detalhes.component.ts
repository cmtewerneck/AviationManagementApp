import { Component } from '@angular/core';
import { DiariaTripulante } from '../models/DiariaTripulante';
import { ActivatedRoute, Router } from '@angular/router';
import { DiariaTripulanteService } from '../services/diariaTripulante.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  diariaTripulante: DiariaTripulante;
  errors: any[] = [];

  constructor(
    private diariaTripulanteService: DiariaTripulanteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.diariaTripulante = this.route.snapshot.data['diariaTripulante'];
  }

  excluirDiariaTripulante(template: any) {
    this.diariaTripulanteService.excluirDiariaTripulante(this.diariaTripulante.id)
    .subscribe(
      diariaTripulante => { this. sucessoExclusao(diariaTripulante) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Diária excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/diarias-tripulantes/listar-todos']);
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