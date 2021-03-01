import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OficioEmitido } from '../models/oficioEmitido';
import { OficioEmitidoService } from '../services/oficioEmitido.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  oficioEmitido: OficioEmitido;
  errors: any[] = [];
  
  constructor(private oficioEmitidoService: OficioEmitidoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.oficioEmitido = this.route.snapshot.data['oficioEmitido'];
    }
    
    public excluirOficioEmitido() {
      this.oficioEmitidoService.excluirOficioEmitido(this.oficioEmitido.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Ofício excluido com Sucesso!', 'Good bye :D');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/oficios-emitidos/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }