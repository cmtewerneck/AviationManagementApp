import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VooAgendado } from '../models/VooAgendado';
import { VooAgendadoService } from '../services/vooAgendado.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  vooAgendado: VooAgendado;
  errors: any[] = [];

  constructor(private vooAgendadoService: VooAgendadoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.vooAgendado = this.route.snapshot.data['vooAgendado'];
  }

  public excluirVooAgendado() {
    this.vooAgendadoService.excluirVooAgendado(this.vooAgendado.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Agendamento excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/voos-agendados/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

