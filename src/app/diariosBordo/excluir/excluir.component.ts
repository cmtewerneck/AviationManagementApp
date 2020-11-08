import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DiarioBordo } from '../models/DiarioBordo';
import { DiarioBordoService } from '../services/diarioBordo.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  diarioBordo: DiarioBordo;
  errors: any[] = [];

  constructor(private diarioBordoService: DiarioBordoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.diarioBordo = this.route.snapshot.data['diarioBordo'];
  }

  public excluirDiarioBordo() {
    this.diarioBordoService.excluirDiarioBordo(this.diarioBordo.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Diário excluido!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/diarios-bordo/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

