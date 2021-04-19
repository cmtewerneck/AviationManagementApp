import { Component } from '@angular/core';
import { CategoriaVoo } from '../models/CategoriaVoo';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaVooService } from '../services/categoriaVoo.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  categoriaVoo: CategoriaVoo;
  errors: any[] = [];

  constructor(
    private categoriaVooService: CategoriaVooService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) {

    this.categoriaVoo = this.route.snapshot.data['categoriaVoo'];
  }

  excluirCategoriaVoo(template: any) {
    this.categoriaVooService.excluirCategoriaVoo(this.categoriaVoo.id)
    .subscribe(
      categoriaVoo => { this. sucessoExclusao(categoriaVoo) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Categoria excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/categorias-voos/listar-todos']);
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