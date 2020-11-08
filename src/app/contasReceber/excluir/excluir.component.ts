import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ContasReceber } from '../models/ContasReceber';
import { ContasReceberService } from '../services/contasReceber.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  contasReceber: ContasReceber;
  errors: any[] = [];

  constructor(private contasReceberService: ContasReceberService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.contasReceber = this.route.snapshot.data['contasReceber'];
  }

  public excluirContasReceber() {
    this.contasReceberService.excluirContasReceber(this.contasReceber.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Conta excluida!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contas-receber/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

