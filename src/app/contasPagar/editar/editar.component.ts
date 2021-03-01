import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContasPagarService } from '../services/contasPagar.service';
import { ContasPagarBaseComponent } from '../contasPagar-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ContasPagarBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private contasPagarService: ContasPagarService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.contasPagar = this.route.snapshot.data['contasPagar'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.contasPagarForm = this.fb.group({
        // CONTAS
        dataVencimento: [''],
        descricao: ['', [Validators.required, Validators.maxLength(50)]],
        codigoBarras: ['', Validators.maxLength(50)],
        situacao: ['', [Validators.required]],
        formaPagamento: ['', Validators.maxLength(30)],
        // CONTAS PAGAR
        valorPagar: ['', [Validators.required]],
        valorPago: [''],
        dataPagamento: ['']
      });
      
      this.contasPagarForm.patchValue({
        id: this.contasPagar.id,
        dataVencimento: this.contasPagar.dataVencimento,
        descricao: this.contasPagar.descricao,
        codigoBarras: this.contasPagar.codigoBarras,
        situacao: this.contasPagar.situacao,
        formaPagamento: this.contasPagar.formaPagamento,
        valorPagar: CurrencyUtils.DecimalParaString(this.contasPagar.valorPagar),
        valorPago: CurrencyUtils.DecimalParaString(this.contasPagar.valorPago),
        dataPagamento: this.contasPagar.dataPagamento
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarContasPagar() {
      if (this.contasPagarForm.dirty && this.contasPagarForm.valid) {
        this.contasPagar = Object.assign({}, this.contasPagar, this.contasPagarForm.value);
        
        this.contasPagar.valorPagar = CurrencyUtils.StringParaDecimal(this.contasPagar.valorPagar);
        this.contasPagar.valorPago = CurrencyUtils.StringParaDecimal(this.contasPagar.valorPago);
        
        this.contasPagarService.atualizarContasPagar(this.contasPagar)
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
        
        let toast = this.toastr.success('Conta editada com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/contas-pagar/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }