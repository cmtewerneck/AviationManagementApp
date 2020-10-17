import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AeronaveAbastecimento } from '../models/AeronaveTarifa';
import { AeronaveAbastecimentoService } from '../services/aeronaveTarifa.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  errors: any[] = [];

  aeronaveAbastecimento: AeronaveAbastecimento;

  constructor(private aeronaveAbastecimentoService: AeronaveAbastecimentoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.aeronaveAbastecimento = this.route.snapshot.data['aeronaveAbastecimento'];
  }

  public excluirAeronaveAbastecimento() {
    this.aeronaveAbastecimentoService.excluirAeronaveAbastecimento(this.aeronaveAbastecimento.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Abastecimento excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-abastecimentos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

