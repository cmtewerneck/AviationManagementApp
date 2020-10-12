import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Veiculo } from '../models/Veiculo';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;

  veiculo: Veiculo;
  errors: any[] = [];

  constructor(private veiculoService: VeiculoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.veiculo = this.route.snapshot.data['veiculo'];
  }

  public excluirVeiculo() {
    this.veiculoService.excluirVeiculo(this.veiculo.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Veículo excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/veiculos/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}
