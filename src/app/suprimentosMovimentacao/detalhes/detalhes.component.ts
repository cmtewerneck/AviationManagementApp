import { Component } from '@angular/core';
import { SuprimentoMovimentacao } from '../models/SuprimentoMovimentacao';
import { ActivatedRoute, Router } from '@angular/router';
import { SuprimentoMovimentacaoService } from '../services/suprimentoMovimentacao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  suprimentoMovimentacao: SuprimentoMovimentacao;
  
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private suprimentoMovimentacaoService: SuprimentoMovimentacaoService) {
      
      this.suprimentoMovimentacao = this.route.snapshot.data['suprimentoMovimentacao'];
    }
    
    openModal(template: any) {
      template.show();
    }
    
    zerarErros() {
      this.errors = [];
    }
    
    excluirSuprimentoMovimentacao(template: any) {
      this.suprimentoMovimentacaoService.excluirSuprimentoMovimentacao(this.suprimentoMovimentacao.id)
      .subscribe(
        suprimentoMovimentacao => { this. sucessoExclusao(suprimentoMovimentacao) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      falha(fail) {
        this.errors = fail.error.errors;
        this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Movimentação excluida!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/suprimentos-movimentacoes/listar-todos']);
          });
        }
      }
      
    }
    