import { Component } from '@angular/core';
import { Veiculo } from '../models/Veiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VeiculoService } from '../services/veiculo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  
  veiculo: Veiculo;
  
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private veiculoService: VeiculoService) {
      
      this.veiculo = this.route.snapshot.data['veiculo'];
    }
    
    openModal(template: any) {
      template.show();
    }
    
    zerarErros() {
      this.errors = [];
    }
    
    excluirVeiculo(template: any) {
      this.veiculoService.excluirVeiculo(this.veiculo.id)
      .subscribe(
        veiculo => { this. sucessoExclusao(veiculo) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      falha(fail) {
        this.errors = fail.error.errors;
        this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Veículo excluido!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/veiculos/listar-todos']);
          });
        }
      }
      
    }
    