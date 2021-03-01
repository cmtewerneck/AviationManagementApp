import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveTarifaService } from '../services/aeronaveTarifa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AeronaveTarifaBaseComponent } from '../aeronaveTarifa-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AeronaveTarifaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private aeronaveTarifaService: AeronaveTarifaService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.aeronaveTarifa = this.route.snapshot.data['aeronaveTarifa'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.aeronaveTarifaService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);

        this.aeronaveTarifaForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          data: ['', [Validators.required]],
          vencimento: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          situacao: [0],
          numeracao: ['', [Validators.required, Validators.maxLength(30)]],
          orgaoEmissor: ['', [Validators.required]]
        });

      this.aeronaveTarifaForm.patchValue({
          id: this.aeronaveTarifa.id,
          aeronaveId: this.aeronaveTarifa.aeronaveId,
          data: this.aeronaveTarifa.data,
          vencimento: this.aeronaveTarifa.vencimento,
          valor: CurrencyUtils.DecimalParaString(this.aeronaveTarifa.valor),
          orgaoEmissor: this.aeronaveTarifa.orgaoEmissor,
          numeracao: this.aeronaveTarifa.numeracao,
          situacao: this.aeronaveTarifa.situacao
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarAeronaveTarifa() {
        if (this.aeronaveTarifaForm.dirty && this.aeronaveTarifaForm.valid) {
          this.aeronaveTarifa = Object.assign({}, this.aeronaveTarifa, this.aeronaveTarifaForm.value);

          this.aeronaveTarifa.valor = CurrencyUtils.StringParaDecimal(this.aeronaveTarifa.valor);
          
          this.aeronaveTarifaService.atualizarAeronaveTarifa(this.aeronaveTarifa)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.aeronaveTarifaForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Tarifa editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/aeronaves-tarifas/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}