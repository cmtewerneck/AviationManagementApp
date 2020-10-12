import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OficioRecebido } from '../models/OficioRecebido';
import { OficioRecebidoService } from '../services/oficioRecebido.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  oficioRecebido: OficioRecebido;
  errors: any[] = [];

  constructor(private oficioRecebidoService: OficioRecebidoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.oficioRecebido = this.route.snapshot.data['oficioRecebido'];
  }

  public excluirOficioRecebido() {
    this.oficioRecebidoService.excluirOficioRecebido(this.oficioRecebido.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Ofício excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/oficios-recebidos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

