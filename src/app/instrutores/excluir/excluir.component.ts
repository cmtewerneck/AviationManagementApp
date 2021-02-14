import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Instrutor } from '../models/Instrutor';
import { InstrutorService } from '../services/instrutor.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;
  errors: any[] = [];
  
  instrutor: Instrutor;

  constructor(private instrutorService: InstrutorService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.instrutor = this.route.snapshot.data['instrutor'];
  }

  public excluirInstrutor() {
    this.instrutorService.excluirInstrutor(this.instrutor.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Instrutor excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/instrutores/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}

