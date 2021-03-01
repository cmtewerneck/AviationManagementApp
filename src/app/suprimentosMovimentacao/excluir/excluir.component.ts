import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuprimentoMovimentacao } from '../models/SuprimentoMovimentacao';
import { SuprimentoMovimentacaoService } from '../services/suprimentoMovimentacao.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  suprimentoMovimentacao: SuprimentoMovimentacao;
  errors: any[] = [];
  
  constructor(private suprimentoMovimentacaoService: SuprimentoMovimentacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.suprimentoMovimentacao = this.route.snapshot.data['suprimentoMovimentacao'];
    }
    
    public excluirSuprimentoMovimentacao() {
      this.suprimentoMovimentacaoService.excluirSuprimentoMovimentacao(this.suprimentoMovimentacao.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Movimentação excluida com Sucesso!', 'Good bye :D');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/suprimentos-movimentacoes/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }   