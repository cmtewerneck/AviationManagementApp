import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PassagemAereaService } from '../services/passagemAerea.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassagemAereaBaseComponent } from '../passagemAerea-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends PassagemAereaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private passagemAereaService: PassagemAereaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.passagemAerea = this.route.snapshot.data['passagemAerea'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.passagemAereaService.obterColaboradores()
      .subscribe(
        colaboradores => this.colaboradores = colaboradores);
        
        this.passagemAereaForm = this.fb.group({
          dataCompra: ['', Validators.required],
          dataVoo: ['', Validators.required],
          valor: ['', Validators.required],
          empresa: ['', [Validators.required, Validators.maxLength(100)]],
          origem: ['', [Validators.required, Validators.maxLength(100)]],
          destino: ['', [Validators.required, Validators.maxLength(100)]],
          formaPagamento: ['', Validators.maxLength(30)],
          assento: ['', [Validators.required, Validators.maxLength(30)]],
          localizador: ['', Validators.maxLength(30)],
          colaboradorId: ['', Validators.required]
        });
        
        this.passagemAereaForm.patchValue({
          id: this.passagemAerea.id,
          dataCompra: this.passagemAerea.dataCompra,
          dataVoo: this.passagemAerea.dataVoo,
          valor: CurrencyUtils.DecimalParaString(this.passagemAerea.valor),
          empresa: this.passagemAerea.empresa,
          origem: this.passagemAerea.origem,
          destino: this.passagemAerea.destino,
          formaPagamento: this.passagemAerea.formaPagamento,
          assento: this.passagemAerea.assento,
          localizador: this.passagemAerea.localizador,
          colaboradorId: this.passagemAerea.colaboradorId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarPassagemAerea() {
        if (this.passagemAereaForm.dirty && this.passagemAereaForm.valid) {
          this.passagemAerea = Object.assign({}, this.passagemAerea, this.passagemAereaForm.value);
          
          // CONVERSÕES DE JSON
          this.passagemAerea.dataCompra = new Date(this.passagemAerea.dataCompra);
          this.passagemAerea.dataVoo = new Date(this.passagemAerea.dataVoo);
          this.passagemAerea.valor = CurrencyUtils.StringParaDecimal(this.passagemAerea.valor);
          // FIM DAS CONVERSÕES
          
          console.log(this.passagemAerea);
          
          this.passagemAereaService.atualizarPassagemAerea(this.passagemAerea)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.passagemAereaForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Passagem editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/passagens-aereas/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
        
      }