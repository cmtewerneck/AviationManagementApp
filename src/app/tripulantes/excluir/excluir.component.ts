import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Tripulante } from '../models/tripulante';
import { TripulanteService } from '../services/tripulante.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;

  errors: any[] = [];

  tripulante: Tripulante;

  constructor(private tripulanteService: TripulanteService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.tripulante = this.route.snapshot.data['tripulante'];
  }

  public excluirTripulante() {
    this.tripulanteService.excluirTripulante(this.tripulante.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Tripulante excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/tripulantes/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

