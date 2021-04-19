import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveMotorService } from '../services/aeronaveMotor.service';
import { AeronaveMotorBaseComponent } from '../aeronaveMotor-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveMotorBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private aeronaveMotorService: AeronaveMotorService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
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
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarAeronaveMotor() {
        if (this.aeronaveMotorForm.dirty && this.aeronaveMotorForm.valid) {
          this.aeronaveMotor = Object.assign({}, this.aeronaveMotor, this.aeronaveMotorForm.value);
          
          // CONVERSÕES PARA JSON
          this.aeronaveMotor.horasTotais = CurrencyUtils.StringParaDecimal(this.aeronaveMotor.horasTotais);
          this.aeronaveMotor.ciclosTotais = CurrencyUtils.StringParaDecimal(this.aeronaveMotor.ciclosTotais);
          // FIM DAS CONVERSÕES

          console.log(this.aeronaveMotor);

          this.aeronaveMotorService.novaAeronaveMotor(this.aeronaveMotor)
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
          
          let toast = this.toastr.success('Motor adicionado com sucesso!', 'Sucesso!');
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
      
      