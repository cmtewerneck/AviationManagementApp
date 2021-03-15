import { Component } from '@angular/core';
import { Mecanico } from '../models/Mecanico';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MecanicoService } from '../services/mecanico.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  mecanico: Mecanico;
  errors: any[] = [];
  
  constructor(
    private mecanicoService: MecanicoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.mecanico = this.route.snapshot.data['mecanico'];
    }
    
    excluirMecanico(template: any) {
      this.mecanicoService.excluirMecanico(this.mecanico.id)
      .subscribe(
        mecanico => { this. sucessoExclusao(mecanico) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Mecânico excluido!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/mecanicos/listar-todos']);
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
    