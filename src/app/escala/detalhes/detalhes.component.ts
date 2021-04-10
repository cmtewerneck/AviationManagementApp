import { Component } from '@angular/core';
import { Escala } from '../models/Escala';
import { ActivatedRoute, Router } from '@angular/router';
import { EscalaService } from '../services/escala.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  errors: any[] = [];

  escala: Escala;

  constructor(
    private escalaService: EscalaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.escala = this.route.snapshot.data['escala'];
  }

  excluirEscala(template: any) {
    this.escalaService.excluirEscala(this.escala.id)
    .subscribe(
      escala => { this. sucessoExclusao(escala) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Escala excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/escalas/listar-todos']);
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
