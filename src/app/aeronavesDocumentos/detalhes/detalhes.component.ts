import { Component } from '@angular/core';
import { AeronaveDocumento } from '../models/AeronaveDocumento';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDocumentoService } from '../services/aeronaveDocumento.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveDocumento: AeronaveDocumento;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private aeronaveDocumentoService: AeronaveDocumentoService) {

    this.aeronaveDocumento = this.route.snapshot.data['aeronaveDocumento'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirDocumento(template: any) {
    this.aeronaveDocumentoService.excluirAeronaveDocumento(this.aeronaveDocumento.id)
    .subscribe(
      aeronaveDocumento => { this. sucessoExclusao(aeronaveDocumento) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Documento excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-documentos/listar-todos']);
      });
    }
  }

}
