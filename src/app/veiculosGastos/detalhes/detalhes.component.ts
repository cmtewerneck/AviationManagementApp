import { Component } from '@angular/core';
import { VeiculoGasto } from '../models/VeiculoGasto';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoGastoService } from '../services/veiculoGasto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  veiculoGasto: VeiculoGasto;
  
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private veiculoGastoService: VeiculoGastoService) {
    
    this.veiculoGasto = this.route.snapshot.data['veiculoGasto'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirVeiculoGasto(template: any) {
    this.veiculoGastoService.excluirVeiculoGasto(this.veiculoGasto.id)
    .subscribe(
      veiculoGasto => { this. sucessoExclusao(veiculoGasto) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Gasto excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/veiculos-gastos/listar-todos']);
      });
    }
  }
  
}
