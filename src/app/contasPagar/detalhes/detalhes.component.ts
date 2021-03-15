import { Component } from '@angular/core';
import { ContasPagar } from '../models/ContasPagar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContasPagarService } from '../services/contasPagar.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  contasPagar: ContasPagar;
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private contasPagarService: ContasPagarService) {

    this.contasPagar = this.route.snapshot.data['contasPagar'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirContaPagar(template: any) {
    this.contasPagarService.excluirContasPagar(this.contasPagar.id)
    .subscribe(
      contasPagar => { this. sucessoExclusao(contasPagar) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Lançamento excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contas-pagar/listar-todos']);
      });
    }
  }

}
