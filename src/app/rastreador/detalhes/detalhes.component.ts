import { Component } from '@angular/core';
import { Rastreador } from '../models/Rastreador';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RastreadorService } from '../services/rastreador.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  rastreador: Rastreador;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private rastreadorService: RastreadorService) {

    this.rastreador = this.route.snapshot.data['rastreador'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirRastreador(template: any) {
    this.rastreadorService.excluirRastreador(this.rastreador.id)
    .subscribe(
      rastreador => { this. sucessoExclusao(rastreador) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Rastreador excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/rastreadores/listar-todos']);
      });
    }
  }

}
