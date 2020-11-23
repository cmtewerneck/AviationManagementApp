import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OrdemServico } from '../models/OrdemServico';
import { OrdemServicoService } from '../services/ordemServico.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  ordemServico: OrdemServico;
  errors: any[] = [];

  constructor(private ordemServicoService: OrdemServicoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.ordemServico = this.route.snapshot.data['ordemServico'];
  }

  public excluirOrdemServico() {
    this.ordemServicoService.excluirOrdemServico(this.ordemServico.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Ordem excluida com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/ordem-servico/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

