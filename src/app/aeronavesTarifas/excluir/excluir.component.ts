import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AeronaveTarifa } from '../models/AeronaveTarifa';
import { AeronaveTarifaService } from '../services/aeronaveTarifa.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  errors: any[] = [];

  aeronaveTarifa: AeronaveTarifa;

  constructor(private aeronaveTarifaService: AeronaveTarifaService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.aeronaveTarifa = this.route.snapshot.data['aeronaveTarifa'];
  }

  public excluirAeronaveTarifa() {
    this.aeronaveTarifaService.excluirAeronaveTarifa(this.aeronaveTarifa.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Tarifa excluida com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-tarifas/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

