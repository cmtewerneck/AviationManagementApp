import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ContasPagar } from '../models/ContasPagar';
import { ContasPagarService } from '../services/contasPagar.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  contasPagar: ContasPagar;
  errors: any[] = [];

  constructor(private contasPagarService: ContasPagarService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.contasPagar = this.route.snapshot.data['contasPagar'];
  }

  public excluirContasPagar() {
    this.contasPagarService.excluirContasPagar(this.contasPagar.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Conta excluida!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contas-pagar/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

