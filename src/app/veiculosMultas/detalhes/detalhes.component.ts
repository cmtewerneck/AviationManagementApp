import { Component } from '@angular/core';
import { VeiculoMulta } from '../models/veiculoMulta';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeiculoMultaService } from '../services/veiculoMulta.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  veiculoMulta: VeiculoMulta;
  
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private veiculoMultaService: VeiculoMultaService) {
      
      this.veiculoMulta = this.route.snapshot.data['veiculoMulta'];
    }
    
    openModal(template: any) {
      template.show();
    }
    
    zerarErros() {
      this.errors = [];
    }
    
    excluirVeiculoMulta(template: any) {
      this.veiculoMultaService.excluirVeiculoMulta(this.veiculoMulta.id)
      .subscribe(
        veiculoMulta => { this. sucessoExclusao(veiculoMulta) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      falha(fail) {
        this.errors = fail.error.errors;
        this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Multa excluida!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/veiculos-multas/listar-todos']);
          });
        }
      }
      
    }
    