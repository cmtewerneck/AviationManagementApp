import { Component } from '@angular/core';
import { Aeronave } from '../models/Aeronave';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AeronaveService } from '../services/aeronave.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  errors: any[] = [];

  aeronave: Aeronave;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private aeronaveService: AeronaveService) {

    this.aeronave = this.route.snapshot.data['aeronave'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirAeronave(template: any) {
    this.aeronaveService.excluirAeronave(this.aeronave.id)
    .subscribe(
      aeronave => { this. sucessoExclusao(aeronave) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Aeronave excluida!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves/listar-todos']);
      });
    }
  }

}
