import { Component } from '@angular/core';
import { ContasReceber } from '../models/ContasReceber';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContasReceberService } from '../services/contasReceber.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  contasReceber: ContasReceber;
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private contasReceberService: ContasReceberService) {

    this.contasReceber = this.route.snapshot.data['contasReceber'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirContaReceber(template: any) {
    this.contasReceberService.excluirContasReceber(this.contasReceber.id)
    .subscribe(
      contasReceber => { this. sucessoExclusao(contasReceber) },
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
        this.router.navigate(['/contas-receber/listar-todos']);
      });
    }
  }

}
