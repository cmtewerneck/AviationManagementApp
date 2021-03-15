import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  errors: any[] = [];
  
  cliente: Cliente;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService) {
      
      this.cliente = this.route.snapshot.data['cliente'];
    }
    
    openModal(template: any) {
      template.show();
    }
    
    zerarErros() {
      this.errors = [];
    }
    
    excluirCliente(template: any) {
      this.clienteService.ExcluirCliente(this.cliente.id)
      .subscribe(
        cliente => { this. sucessoExclusao(cliente) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      falha(fail) {
        this.errors = fail.error.errors;
        this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Cliente excluido!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/clientes/listar-todos']);
          });
        }
      }
      
    }
    