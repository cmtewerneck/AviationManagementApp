import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveAbastecimentoService } from '../services/aeronaveAbastecimento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AeronaveAbastecimentoBaseComponent } from '../aeronaveAbastecimento-form.base.component';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AeronaveAbastecimentoBaseComponent implements OnInit {
  
  arquivos: string = environment.filesUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  arquivoNome: string;
  arquivoOriginalSrc: string;

  constructor(private fb: FormBuilder,
              private aeronaveAbastecimentoService: AeronaveAbastecimentoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.aeronaveAbastecimento = this.route.snapshot.data['aeronaveAbastecimento'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.aeronaveAbastecimentoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);

        this.aeronaveAbastecimentoForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          data: ['', [Validators.required]],
          litros: ['', [Validators.required]],
          local: ['', [Validators.required, Validators.maxLength(20)]],
          cupom: ['', [Validators.required, Validators.maxLength(20)]],
          notaFiscal: ['', Validators.maxLength(20)],
          fornecedora: ['', [Validators.required, Validators.maxLength(20)]],
          responsavel: ['', [Validators.required, Validators.maxLength(20)]],
          valor: [''],
          observacoes: ['', Validators.maxLength(100)],
          comprovante: ['']
        });

      this.aeronaveAbastecimentoForm.patchValue({
          id: this.aeronaveAbastecimento.id,
          aeronaveId: this.aeronaveAbastecimento.aeronaveId,
          data: this.aeronaveAbastecimento.data,
          litros: this.aeronaveAbastecimento.litros,
          local: this.aeronaveAbastecimento.local,
          cupom: this.aeronaveAbastecimento.cupom,
          notaFiscal: this.aeronaveAbastecimento.notaFiscal,
          fornecedora: this.aeronaveAbastecimento.fornecedora,
          responsavel: this.aeronaveAbastecimento.responsavel,
          valor: CurrencyUtils.DecimalParaString(this.aeronaveAbastecimento.valor),
          observacoes: this.aeronaveAbastecimento.observacoes
        });

        this.arquivoOriginalSrc = this.arquivos + this.aeronaveAbastecimento.comprovante;

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarAeronaveAbastecimento() {
        if (this.aeronaveAbastecimentoForm.dirty && this.aeronaveAbastecimentoForm.valid) {
          this.aeronaveAbastecimento = Object.assign({}, this.aeronaveAbastecimento, this.aeronaveAbastecimentoForm.value);

          // IMPLEMENTAR EDIÇÃO DO ARQUIVO

          // CONVERSÕES PARA JSON
          //this.aeronaveAbastecimento.comprovanteUpload = this.comprovante.split(',')[1];
          this.aeronaveAbastecimento.data = new Date(this.aeronaveAbastecimento.data);
          this.aeronaveAbastecimento.litros = Number(this.aeronaveAbastecimento.litros);
          this.aeronaveAbastecimento.comprovante = this.arquivoNome;
          this.aeronaveAbastecimento.valor = CurrencyUtils.StringParaDecimal(this.aeronaveAbastecimento.valor);
          // FIM DAS CONVERSÕES

          console.log(this.aeronaveAbastecimento);

          this.aeronaveAbastecimentoService.atualizarAeronaveAbastecimento(this.aeronaveAbastecimento)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.aeronaveAbastecimentoForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Abastecimento editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/aeronaves-abastecimentos/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}