import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Aeronave } from '../models/Aeronave';
import { AeronaveService } from '../services/aeronave.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;
  errors: any[] = [];

  aeronave: Aeronave;

  constructor(private aeronaveService: AeronaveService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.aeronave = this.route.snapshot.data['aeronave'];
  }

  public excluirAeronave() {
    this.aeronaveService.excluirAeronave(this.aeronave.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Aeronave excluida com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

