import { Component } from '@angular/core';
import { Instrutor } from '../models/Instrutor';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { InstrutorService } from '../services/instrutor.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {
  
  imagens: string = environment.imagensUrl;
  
  instrutor: Instrutor;
  
  errors: any[] = [];
  
  constructor(
    private instrutorService: InstrutorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      
      this.instrutor = this.route.snapshot.data['instrutor'];
    }
    
    excluirInstrutor(template: any) {
      this.instrutorService.excluirInstrutor(this.instrutor.id)
      .subscribe(
        instrutor => { this. sucessoExclusao(instrutor) },
        error => { this.falha(error) }
        )
        template.hide();
      }
      
      sucessoExclusao(evento: any) {
        const toast = this.toastr.success('Instrutor excluido!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/instrutores/listar-todos']);
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
    