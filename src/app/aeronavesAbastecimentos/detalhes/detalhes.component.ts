import { Component } from '@angular/core';
import { AeronaveAbastecimento } from '../models/AeronaveAbastecimento';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveAbastecimentoService } from '../services/aeronaveAbastecimento.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveAbastecimento: AeronaveAbastecimento;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private aeronaveAbastecimentoService: AeronaveAbastecimentoService) {

    this.aeronaveAbastecimento = this.route.snapshot.data['aeronaveAbastecimento'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirAbastecimento(template: any) {
    this.aeronaveAbastecimentoService.excluirAeronaveAbastecimento(this.aeronaveAbastecimento.id)
    .subscribe(
      aeronaveAbastecimento => { this. sucessoExclusao(aeronaveAbastecimento) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Abastecimento excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-abastecimentos/listar-todos']);
      });
    }
  }

}
