import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Estoque } from '../models/Estoque';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  imagens: string = environment.imagensUrl;

  estoque: Estoque;
  errors: any[] = [];

  constructor(private estoqueService: EstoqueService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

    this.estoque = this.route.snapshot.data['estoque'];
  }

  public excluirEstoque() {
    this.estoqueService.excluirEstoque(this.estoque.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Ítem excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/estoque/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }

}
