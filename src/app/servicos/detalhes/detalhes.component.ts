import { Component } from '@angular/core';
import { Servico } from '../models/Servico';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from '../services/servico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  servico: Servico;
  
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private servicoService: ServicoService) {
    
    this.servico = this.route.snapshot.data['servico'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirServico(template: any) {
    this.servicoService.excluirServico(this.servico.id)
    .subscribe(
      servico => { this. sucessoExclusao(servico) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Serviço excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/servicos/listar-todos']);
      });
    }
  }
  
}
