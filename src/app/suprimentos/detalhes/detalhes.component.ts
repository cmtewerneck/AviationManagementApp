import { Component } from '@angular/core';
import { Suprimento } from '../models/Suprimento';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SuprimentoService } from '../services/suprimento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;

  suprimento: Suprimento;

  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private suprimentoService: SuprimentoService) {

    this.suprimento = this.route.snapshot.data['suprimento'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirSuprimento(template: any) {
    this.suprimentoService.excluirSuprimento(this.suprimento.id)
    .subscribe(
      suprimento => { this. sucessoExclusao(suprimento) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Item excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/suprimentos/listar-todos']);
      });
    }
  }

}
