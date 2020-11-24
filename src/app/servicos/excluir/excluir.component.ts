import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Servico } from '../models/Servico';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  servico: Servico;
  errors: any[] = [];

  constructor(private servicoService: ServicoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.servico = this.route.snapshot.data['servico'];
  }

  public excluirServico() {
    this.servicoService.excluirServico(this.servico.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Serviço excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/servicos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

