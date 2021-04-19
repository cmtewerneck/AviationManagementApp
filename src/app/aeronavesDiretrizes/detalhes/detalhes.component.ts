import { Component } from '@angular/core';
import { AeronaveDiretriz } from '../models/AeronaveDiretriz';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDiretrizService } from '../services/aeronaveDiretriz.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveDiretriz: AeronaveDiretriz;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private aeronaveDiretrizService: AeronaveDiretrizService) {

    this.aeronaveDiretriz = this.route.snapshot.data['aeronaveDiretriz'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirDiretriz(template: any) {
    this.aeronaveDiretrizService.excluirAeronaveDiretriz(this.aeronaveDiretriz.id)
    .subscribe(
      aeronaveDiretriz => { this. sucessoExclusao(aeronaveDiretriz) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Diretriz excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-diretrizes/listar-todos']);
      });
    }
  }

}
