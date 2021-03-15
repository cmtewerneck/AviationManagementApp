import { Component } from '@angular/core';
import { OficioEmitido } from '../models/oficioEmitido';
import { ActivatedRoute, Router } from '@angular/router';
import { OficioEmitidoService } from '../services/oficioEmitido.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  oficioEmitido: OficioEmitido;
  errors: any[] = [];

  constructor(
    private oficioEmitidoService: OficioEmitidoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {
    
    this.oficioEmitido = this.route.snapshot.data['oficioEmitido'];
  }

  excluirOficioEmitido(template: any) {
    this.oficioEmitidoService.excluirOficioEmitido(this.oficioEmitido.id)
    .subscribe(
      oficioEmitido => { this. sucessoExclusao(oficioEmitido) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Ofício excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/oficios-emitidos/listar-todos']);
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