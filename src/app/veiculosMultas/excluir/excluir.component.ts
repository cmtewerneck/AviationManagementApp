import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VeiculoMulta } from '../models/veiculoMulta';
import { VeiculoMultaService } from '../services/veiculoMulta.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  veiculoMulta: VeiculoMulta;
  errors: any[] = [];

  constructor(private veiculoMultaService: VeiculoMultaService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.veiculoMulta = this.route.snapshot.data['veiculoMulta'];
  }

  public excluirVeiculoMulta() {
    this.veiculoMultaService.excluirVeiculoMulta(this.veiculoMulta.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Multa excluida com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/veiculos-multas/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

