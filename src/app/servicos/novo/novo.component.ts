import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ServicoService } from '../services/servico.service';
import { ServicoBaseComponent } from '../servico-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ServicoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private servicoService: ServicoService,
              private router: Router,
              private toastr: ToastrService) { super(); }

  ngOnInit(): void {

    this.servicoForm = this.fb.group({
       codigo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
       descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
       custo: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarServico() {
    if (this.servicoForm.dirty && this.servicoForm.valid) {
      this.servico = Object.assign({}, this.servico, this.servicoForm.value);

      this.servico.custo = CurrencyUtils.StringParaDecimal(this.servico.custo);

      this.servicoService.novoServico(this.servico)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.servicoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Serviço cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/servicos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

