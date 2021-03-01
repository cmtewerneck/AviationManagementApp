import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VooInstrucao } from '../models/VooInstrucao';
import { VooInstrucaoService } from '../services/vooInstrucao.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  vooInstrucao: VooInstrucao;
  errors: any[] = [];
  
  constructor(private vooInstrucaoService: VooInstrucaoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.vooInstrucao = this.route.snapshot.data['vooInstrucao'];
    }
    
    public excluirVooInstrucao() {
      this.vooInstrucaoService.excluirVooInstrucao(this.vooInstrucao.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Instrução excluida!', 'Sucesso');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/voos-instrucao/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }