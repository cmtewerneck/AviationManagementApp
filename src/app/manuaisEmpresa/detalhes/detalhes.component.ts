import { Component } from '@angular/core';
import { ManualEmpresa } from '../models/ManualEmpresa';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualEmpresaService } from '../services/manualEmpresa.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  manualEmpresa: ManualEmpresa;
  errors: any[] = [];

  constructor(
    private manualEmpresaService: ManualEmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {
    
    this.manualEmpresa = this.route.snapshot.data['manualEmpresa'];
  }

  excluirManualEmpresa(template: any) {
    this.manualEmpresaService.excluirManualEmpresa(this.manualEmpresa.id)
    .subscribe(
      manualEmpresa => { this. sucessoExclusao(manualEmpresa) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Manual excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/manuais-empresa/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }
  
}
