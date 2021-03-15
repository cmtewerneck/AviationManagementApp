import { Component } from '@angular/core';
import { Motorista } from '../models/Motorista';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MotoristaService } from '../services/motorista.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  motorista: Motorista;
  errors: any[] = [];
  
  constructor(
    private motoristaService: MotoristaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.motorista = this.route.snapshot.data['motorista'];
    }
    
    excluirMotorista(template: any) {
      this.motoristaService.excluirMotorista(this.motorista.id)
      .subscribe(
        motorista => { this. sucessoExclusao(motorista) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Motorista excluido!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/motoristas/listar-todos']);
          });
        }
      }
      
      falha(fail) {
        this.errors = fail.error.errors;
        this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
      }
      
      openModal(template: any) {
        template.show();
      }
      
      zerarErros() {
        this.errors = [];
      }
      
    }
    