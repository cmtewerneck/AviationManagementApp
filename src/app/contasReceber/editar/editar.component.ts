import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContasReceberService } from '../services/contasReceber.service';
import { ContasReceberBaseComponent } from '../contasReceber-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ContasReceberBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private contasReceberService: ContasReceberService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.contasReceber = this.route.snapshot.data['contasReceber'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.contasReceberForm = this.fb.group({
        dataVencimento: ['', [Validators.required]],
        descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        codigoBarras: ['', [Validators.maxLength(100)]],
        valorPagar: ['', [Validators.required]],
        situacao: [0],
        dataRecebimento: [''],
        valorRecebido: [''],
        formaPagamento: ['']
      });

      this.contasReceberForm.patchValue({
          id: this.contasReceber.id,
          dataVencimento: this.contasReceber.dataVencimento,
          descricao: this.contasReceber.descricao,
          codigoBarras: this.contasReceber.codigoBarras,
          valorPagar: CurrencyUtils.DecimalParaString(this.contasReceber.valorPagar),
          valorRecebido: CurrencyUtils.DecimalParaString(this.contasReceber.valorRecebido),
          situacao: this.contasReceber.situacao,
          dataRecebimento: this.contasReceber.dataRecebimento,
          formaPagamento: this.contasReceber.formaPagamento
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarContasReceber() {
        if (this.contasReceberForm.dirty && this.contasReceberForm.valid) {
          this.contasReceber = Object.assign({}, this.contasReceber, this.contasReceberForm.value);

          this.contasReceber.valorPagar = CurrencyUtils.StringParaDecimal(this.contasReceber.valorPagar);
          this.contasReceber.valorRecebido = CurrencyUtils.StringParaDecimal(this.contasReceber.valorRecebido);

          this.contasReceberService.atualizarContasReceber(this.contasReceber)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.contasReceberForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Conta editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/contas-receber/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}