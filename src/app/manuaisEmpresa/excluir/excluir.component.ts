import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ManualEmpresa } from '../models/ManualEmpresa';
import { ManualEmpresaService } from '../services/manualEmpresa.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  manualEmpresa: ManualEmpresa;
  errors: any[] = [];

  constructor(private manualEmpresaService: ManualEmpresaService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.manualEmpresa = this.route.snapshot.data['manualEmpresa'];
  }

  public excluirManualEmpresa() {
    this.manualEmpresaService.excluirManualEmpresa(this.manualEmpresa.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Manual excluido!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/manuais-empresa/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

