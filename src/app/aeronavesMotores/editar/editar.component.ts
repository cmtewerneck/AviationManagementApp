import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveMotorService } from '../services/aeronaveMotor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AeronaveMotorBaseComponent } from '../aeronaveMotor-form.base.component';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AeronaveMotorBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private aeronaveMotorService: AeronaveMotorService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.aeronaveMotor = this.route.snapshot.data['aeronaveMotor'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.aeronaveMotorService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.aeronaveMotorForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          fabricante: ['', [Validators.required, Validators.maxLength(50)]],
          modelo: ['', [Validators.required, Validators.maxLength(50)]],
          numeroSerie: ['', [Validators.required, Validators.maxLength(50)]],
          horasTotais: [''],
          ciclosTotais: ['']
        });

      this.aeronaveMotorForm.patchValue({
          id: this.aeronaveMotor.id,
          aeronaveId: this.aeronaveMotor.aeronaveId,
          fabricante: this.aeronaveMotor.fabricante,
          modelo: this.aeronaveMotor.modelo,
          numeroSerie: this.aeronaveMotor.numeroSerie,
          horasTotais: CurrencyUtils.DecimalParaString(this.aeronaveMotor.horasTotais),
          ciclosTotais: CurrencyUtils.DecimalParaString(this.aeronaveMotor.ciclosTotais)
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarAeronaveMotor() {
        if (this.aeronaveMotorForm.dirty && this.aeronaveMotorForm.valid) {
          this.aeronaveMotor = Object.assign({}, this.aeronaveMotor, this.aeronaveMotorForm.value);

           // CONVERSÕES PARA JSON
           this.aeronaveMotor.horasTotais = CurrencyUtils.StringParaDecimal(this.aeronaveMotor.horasTotais);
           this.aeronaveMotor.ciclosTotais = CurrencyUtils.StringParaDecimal(this.aeronaveMotor.ciclosTotais);
           // FIM DAS CONVERSÕES

          console.log(this.aeronaveMotor);

          this.aeronaveMotorService.atualizarAeronaveMotor(this.aeronaveMotor)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.aeronaveMotorForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Motor editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/aeronaves-motores/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}