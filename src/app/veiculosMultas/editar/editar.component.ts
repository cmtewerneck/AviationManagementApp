import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeiculoMultaService } from '../services/veiculoMulta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VeiculoMultaBaseComponent } from '../veiculoMulta-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends VeiculoMultaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private veiculoMultaService: VeiculoMultaService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.veiculoMulta = this.route.snapshot.data['veiculoMulta'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.veiculoMultaService.obterVeiculos()
      .subscribe(
        veiculos => this.veiculos = veiculos);

      this.veiculoMultaForm = this.fb.group({
          veiculoId: ['', [Validators.required]],
          autoInfracao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
          motorista: [''],
          classificacao: [''],
          descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
          data: ['', [Validators.required]],
          situacao: [0]
       });

      this.veiculoMultaForm.patchValue({
          id: this.veiculoMulta.id,
          veiculoId: this.veiculoMulta.veiculoId,
          autoInfracao: this.veiculoMulta.autoInfracao,
          motorista: this.veiculoMulta.motorista,
          situacao: this.veiculoMulta.situacao,
          descricao: this.veiculoMulta.descricao,
          data: this.veiculoMulta.data,
          classificacao: this.veiculoMulta.classificacao
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarVeiculoMulta() {
        if (this.veiculoMultaForm.dirty && this.veiculoMultaForm.valid) {
          this.veiculoMulta = Object.assign({}, this.veiculoMulta, this.veiculoMultaForm.value);

          this.veiculoMultaService.atualizarVeiculoMulta(this.veiculoMulta)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.veiculoMultaForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Multa editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/veiculos-multas/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}