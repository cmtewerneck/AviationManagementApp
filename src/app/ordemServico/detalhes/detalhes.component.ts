import { Component } from '@angular/core';
import { OrdemServico } from '../models/OrdemServico';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServicoService } from '../services/ordemServico.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  ordemServico: OrdemServico;
  errors: any[] = [];
  
  constructor(
    private ordemServicoService: OrdemServicoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {
      
      this.ordemServico = this.route.snapshot.data['ordemServico'];
    }
    
    excluirOrdemServico(template: any) {
      this.ordemServicoService.excluirOrdemServico(this.ordemServico.id)
      .subscribe(
        ordemServico => { this. sucessoExclusao(ordemServico) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('OS excluida!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/ordem-servico/listar-todos']);
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
    