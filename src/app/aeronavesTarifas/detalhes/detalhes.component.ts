import { Component } from '@angular/core';
import { AeronaveTarifa } from '../models/AeronaveTarifa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveTarifaService } from '../services/aeronaveTarifa.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveTarifa: AeronaveTarifa;
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private aeronaveTarifaService: AeronaveTarifaService) {

    this.aeronaveTarifa = this.route.snapshot.data['aeronaveTarifa'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirTarifa(template: any) {
    this.aeronaveTarifaService.excluirAeronaveTarifa(this.aeronaveTarifa.id)
    .subscribe(
      aeronaveTarifa => { this. sucessoExclusao(aeronaveTarifa) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Tarifa excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-tarifas/listar-todos']);
      });
    }
  }

}
