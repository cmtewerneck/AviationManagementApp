import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ManualVoo } from '../models/ManualVoo';
import { ManualVooService } from '../services/manualVoo.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  manualVoo: ManualVoo;
  errors: any[] = [];

  constructor(private manualVooService: ManualVooService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.manualVoo = this.route.snapshot.data['manualVoo'];
  }

  public excluirManualVoo() {
    this.manualVooService.excluirManualVoo(this.manualVoo.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Manual excluido!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/manuais-voo/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

