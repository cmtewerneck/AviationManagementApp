import { Component } from '@angular/core';
import { ManualVoo } from '../models/ManualVoo';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ManualVooService } from '../services/manualVoo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  manualVoo: ManualVoo;
  errors: any[] = [];

  constructor(
    private manualVooService: ManualVooService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {
    
    this.manualVoo = this.route.snapshot.data['manualVoo'];
  }

  excluirManualVoo(template: any) {
    this.manualVooService.excluirManualVoo(this.manualVoo.id)
    .subscribe(
      manualVoo => { this. sucessoExclusao(manualVoo) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Manual excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/manuais-voo/listar-todos']);
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
