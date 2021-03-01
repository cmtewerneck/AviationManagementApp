import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Suprimento } from '../models/Suprimento';
import { SuprimentoService } from '../services/suprimento.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {
  
  imagens: string = environment.imagensUrl;
  
  suprimento: Suprimento;
  errors: any[] = [];
  
  constructor(private suprimentoService: SuprimentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.suprimento = this.route.snapshot.data['suprimento'];
    }
    
    public excluirSuprimento() {
      this.suprimentoService.excluirSuprimento(this.suprimento.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        ()     => { this.falha() }
        );
      }
      
      public sucessoExclusao(evento: any) {
        
        const toast = this.toastr.success('Ítem excluido com Sucesso!', 'Good bye :D');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/suprimentos/listar-todos']);
          });
        }
      }
      
      public falha() {
        this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
      }
      
    }   