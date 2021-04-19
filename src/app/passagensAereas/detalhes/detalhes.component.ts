import { Component } from '@angular/core';
import { PassagemAerea } from '../models/PassagemAerea';
import { ActivatedRoute, Router } from '@angular/router';
import { PassagemAereaService } from '../services/passagemAerea.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  passagemAerea: PassagemAerea;
  errors: any[] = [];

  constructor(
    private passagemAereaService: PassagemAereaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.passagemAerea = this.route.snapshot.data['passagemAerea'];
  }

  excluirPassagemAerea(template: any) {
    this.passagemAereaService.excluirPassagemAerea(this.passagemAerea.id)
    .subscribe(
      passagemAerea => { this. sucessoExclusao(passagemAerea) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Passagem excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/passagens-aereas/listar-todos']);
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