import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeiculoGastoService } from '../services/veiculoGasto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VeiculoGastoBaseComponent } from '../veiculoGasto-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends VeiculoGastoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private veiculoGastoService: VeiculoGastoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.veiculoGasto = this.route.snapshot.data['veiculoGasto'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.veiculoGastoService.obterVeiculos()
      .subscribe(
        veiculos => this.veiculos = veiculos);

      this.veiculoGastoForm = this.fb.group({
          veiculoId: ['', [Validators.required]],
          data: ['', [Validators.required]],
          descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
          motorista: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          valor: ['', [Validators.required]],
          situacao: [0]
       });

      this.veiculoGastoForm.patchValue({
          id: this.veiculoGasto.id,
          veiculoId: this.veiculoGasto.veiculoId,
          data: this.veiculoGasto.data,
          descricao: this.veiculoGasto.descricao,
          motorista: this.veiculoGasto.motorista,
          valor: CurrencyUtils.DecimalParaString(this.veiculoGasto.valor),
          situacao: this.veiculoGasto.situacao
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarVeiculoGasto() {
        if (this.veiculoGastoForm.dirty && this.veiculoGastoForm.valid) {
          this.veiculoGasto = Object.assign({}, this.veiculoGasto, this.veiculoGastoForm.value);

          this.veiculoGasto.valor = CurrencyUtils.StringParaDecimal(this.veiculoGasto.valor);
          this.veiculoGastoService.atualizarVeiculoGasto(this.veiculoGasto)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.veiculoGastoForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Gasto editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/veiculos-gastos/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}