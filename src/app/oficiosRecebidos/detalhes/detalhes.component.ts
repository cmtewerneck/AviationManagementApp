import { Component } from '@angular/core';
import { OficioRecebido } from '../models/OficioRecebido';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OficioRecebidoService } from '../services/oficioRecebido.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  oficioRecebido: OficioRecebido;
  errors: any[] = [];

  constructor(
    private oficioRecebidoService: OficioRecebidoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {
    
    this.oficioRecebido = this.route.snapshot.data['oficioRecebido'];
  }

  excluirOficioRecebido(template: any) {
    this.oficioRecebidoService.excluirOficioRecebido(this.oficioRecebido.id)
    .subscribe(
      oficioRecebido => { this. sucessoExclusao(oficioRecebido) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Ofício excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/oficios-recebidos/listar-todos']);
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
