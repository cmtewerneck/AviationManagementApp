import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Motorista } from '../models/Motorista';
import { MotoristaService } from '../services/motorista.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  imagens: string = environment.imagensUrl;
  
  errors: any[] = [];
  
  motorista: Motorista;
  
  constructor(private motoristaService: MotoristaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.motorista = this.route.snapshot.data['motorista'];
    }
    
    public excluirMotorista() {
      this.motoristaService.excluirMotorista(this.motorista.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Motorista excluido com Sucesso!', 'Good bye :D');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/motoristas/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }
    
    