import { Component } from '@angular/core';
import { VooInstrucao } from '../models/VooInstrucao';
import { ActivatedRoute, Router } from '@angular/router';
import { VooInstrucaoService } from '../services/vooInstrucao.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  vooInstrucao: VooInstrucao;

  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private vooInstrucaoService: VooInstrucaoService) {

    this.vooInstrucao = this.route.snapshot.data['vooInstrucao'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirVooInstrucao(template: any) {
    this.vooInstrucaoService.excluirVooInstrucao(this.vooInstrucao.id)
    .subscribe(
      vooInstrucao => { this. sucessoExclusao(vooInstrucao) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Instrução excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/voos-instrucao/listar-todos']);
      });
    }
  }

}