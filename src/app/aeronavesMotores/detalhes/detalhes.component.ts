import { Component } from '@angular/core';
import { AeronaveMotor } from '../models/AeronaveMotor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveMotorService } from '../services/aeronaveMotor.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  aeronaveMotor: AeronaveMotor;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private aeronaveMotorService: AeronaveMotorService) {

    this.aeronaveMotor = this.route.snapshot.data['aeronaveMotor'];
  }

  openModal(template: any) {
    template.show();
  }

  zerarErros() {
    this.errors = [];
  }

  excluirMotor(template: any) {
    this.aeronaveMotorService.excluirAeronaveMotor(this.aeronaveMotor.id)
    .subscribe(
      aeronaveMotor => { this. sucessoExclusao(aeronaveMotor) },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    const toast = this.toastr.success('Motor excluido!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-motores/listar-todos']);
      });
    }
  }

}
