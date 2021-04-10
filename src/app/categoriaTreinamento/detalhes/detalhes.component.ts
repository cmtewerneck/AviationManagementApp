import { Component } from '@angular/core';
import { CategoriaTreinamento } from '../models/CategoriaTreinamento';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaTreinamentoService } from '../services/categoriaTreinamento.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  categoriaTreinamento: CategoriaTreinamento;
  errors: any[] = [];

  constructor(
    private categoriaTreinamentoService: CategoriaTreinamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.categoriaTreinamento = this.route.snapshot.data['categoriaTreinamento'];
  }

  excluirCategoriaTreinamento(template: any) {
    this.categoriaTreinamentoService.excluirCategoriaTreinamento(this.categoriaTreinamento.id)
    .subscribe(
      categoriaTreinamento => { this. sucessoExclusao(categoriaTreinamento) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Categoria excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/categorias-treinamentos/listar-todos']);
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