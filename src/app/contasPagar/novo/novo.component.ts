import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContasPagarService } from '../services/contasPagar.service';
import { ContasPagarBaseComponent } from '../contasPagar-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ContasPagarBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private contasPagarService: ContasPagarService,
              private router: Router,
              private toastr: ToastrService) {super(); }

  ngOnInit(): void {

      this.contasPagarForm = this.fb.group({
       dataVencimento: ['', [Validators.required]],
       descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
       codigoBarras: ['', [Validators.maxLength(100)]],
       valorPagar: ['', [Validators.required]],
       situacao: [true],
       dataPagamento: [''],
       valorPago: [''],
       formaPagamento: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarContasPagar() {
    if (this.contasPagarForm.dirty && this.contasPagarForm.valid) {
      this.contasPagar = Object.assign({}, this.contasPagar, this.contasPagarForm.value);
      
      this.contasPagar.valorPagar = CurrencyUtils.StringParaDecimal(this.contasPagar.valorPagar);
      this.contasPagar.valorPago = CurrencyUtils.StringParaDecimal(this.contasPagar.valorPago);
      
      this.contasPagarService.novoContasPagar(this.contasPagar)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.contasPagarForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Conta cadastrada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contas-pagar/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa...');
  }
}

