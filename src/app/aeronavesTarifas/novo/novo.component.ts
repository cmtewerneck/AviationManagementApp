import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveTarifaService } from '../services/aeronaveTarifa.service';
import { AeronaveTarifaBaseComponent } from '../aeronaveTarifa-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveTarifaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private aeronaveTarifaService: AeronaveTarifaService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.aeronaveTarifaService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.aeronaveTarifaForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          data: ['', [Validators.required]],
          vencimento: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          situacao: [true],
          numeracao: ['', [Validators.required, Validators.maxLength(30)]],
          orgaoEmissor: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarAeronaveTarifa() {
        if (this.aeronaveTarifaForm.dirty && this.aeronaveTarifaForm.valid) {
          this.aeronaveTarifa = Object.assign({}, this.aeronaveTarifa, this.aeronaveTarifaForm.value);
          
          this.aeronaveTarifa.valor = CurrencyUtils.StringParaDecimal(this.aeronaveTarifa.valor);
          
          this.aeronaveTarifaService.novaAeronaveTarifa(this.aeronaveTarifa)
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
          
          let toast = this.toastr.success('Tarifa adicionada com sucesso!', 'Sucesso!');
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