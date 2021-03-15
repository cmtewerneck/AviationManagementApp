import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Mecanico } from '../models/Mecanico';
import { MecanicoService } from '../services/mecanico.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;

  errors: any[] = [];

  mecanico: Mecanico;

  constructor(private mecanicoService: MecanicoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.mecanico = this.route.snapshot.data['mecanico'];
  }

  public excluirMecanico() {
    this.mecanicoService.excluirMecanico(this.mecanico.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Mecânico excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/mecanicos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

