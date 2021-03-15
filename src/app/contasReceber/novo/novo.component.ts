import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContasReceberService } from '../services/contasReceber.service';
import { ContasReceberBaseComponent } from '../contasReceber-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ContasReceberBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private contasReceberService: ContasReceberService,
              private router: Router,
              private toastr: ToastrService) {super(); }

  ngOnInit(): void {

      this.contasReceberForm = this.fb.group({
       // CONTAS
       dataVencimento: [''],
       descricao: ['', [Validators.required, Validators.maxLength(50)]],
       codigoBarras: ['', Validators.maxLength(50)],
       situacao: ['', [Validators.required]],
       formaPagamento: ['', Validators.maxLength(30)],
       // CONTAS RECEBER
       valorReceber: ['', [Validators.required]],
       valorRecebido: [''],
       dataRecebimento: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarContasReceber() {
    if (this.contasReceberForm.dirty && this.contasReceberForm.valid) {
      this.contasReceber = Object.assign({}, this.contasReceber, this.contasReceberForm.value);

      // CONVERSÕES PARA JSON
      if (this.contasReceber.dataVencimento) { this.contasReceber.dataVencimento = new Date(this.contasReceber.dataVencimento); } else { this.contasReceber.dataVencimento = null; }
      this.contasReceber.situacao = Number(this.contasReceber.situacao);
      this.contasReceber.valorReceber = CurrencyUtils.StringParaDecimal(this.contasReceber.valorReceber);
      this.contasReceber.valorRecebido = CurrencyUtils.StringParaDecimal(this.contasReceber.valorRecebido);
      if (this.contasReceber.dataRecebimento) { this.contasReceber.dataRecebimento = new Date(this.contasReceber.dataRecebimento); } else { this.contasReceber.dataRecebimento = null; }
      // FIM DAS CONVERSÕES

      console.log(this.contasReceber);

      this.contasReceberService.novoContasReceber(this.contasReceber)
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

    let toast = this.toastr.success('Conta cadastrada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/contas-receber/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa...');
  }
}

