import { Component } from '@angular/core';
import { Tripulante } from '../models/tripulante';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TripulanteService } from '../services/tripulante.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  tripulante: Tripulante;
  errors: any[] = [];
  
  constructor(
    private tripulanteService: TripulanteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.tripulante = this.route.snapshot.data['tripulante'];
    }
    
    excluirTripulante(template: any) {
      this.tripulanteService.excluirTripulante(this.tripulante.id)
      .subscribe(
        tripulante => { this. sucessoExclusao(tripulante) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Tripulante excluido!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/tripulantes/listar-todos']);
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
    