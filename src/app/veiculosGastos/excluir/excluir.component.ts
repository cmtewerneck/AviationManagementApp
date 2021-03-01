import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VeiculoGasto } from '../models/VeiculoGasto';
import { VeiculoGastoService } from '../services/veiculoGasto.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  veiculoGasto: VeiculoGasto;
  errors: any[] = [];
  
  constructor(private veiculoGastoService: VeiculoGastoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.veiculoGasto = this.route.snapshot.data['veiculoGasto'];
    }
    
    public excluirVeiculoGasto() {
      this.veiculoGastoService.excluirVeiculoGasto(this.veiculoGasto.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Gasto excluido com Sucesso!', 'Good bye :D');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/veiculos-gastos/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }