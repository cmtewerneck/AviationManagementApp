import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PassagemAereaService } from '../services/passagemAerea.service';
import { PassagemAereaBaseComponent } from '../passagemAerea-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends PassagemAereaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private passagemAereaService: PassagemAereaService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.passagemAereaService.obterColaboradores()
      .subscribe(
        colaboradores => this.colaboradores = colaboradores);
        
        this.passagemAereaForm = this.fb.group({
          dataCompra: ['', Validators.required],
          dataVoo: ['', Validators.required],
          valor: ['0', Validators.required],
          empresa: ['', [Validators.required, Validators.maxLength(100)]],
          origem: ['', [Validators.required, Validators.maxLength(100)]],
          destino: ['', [Validators.required, Validators.maxLength(100)]],
          formaPagamento: ['', Validators.maxLength(30)],
          assento: ['', [Validators.required, Validators.maxLength(30)]],
          localizador: ['', Validators.maxLength(30)],
          colaboradorId: ['', Validators.required]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarPassagemAerea() {
        if (this.passagemAereaForm.dirty && this.passagemAereaForm.valid) {
          this.passagemAerea = Object.assign({}, this.passagemAerea, this.passagemAereaForm.value);
          
          // CONVERSÕES DE JSON
          this.passagemAerea.dataCompra = new Date(this.passagemAerea.dataCompra);
          this.passagemAerea.dataVoo = new Date(this.passagemAerea.dataVoo);
          this.passagemAerea.valor = CurrencyUtils.StringParaDecimal(this.passagemAerea.valor);
          // FIM DAS CONVERSÕES
          
          console.log(this.passagemAerea);
          
          this.passagemAereaService.novaPassagemAerea(this.passagemAerea)
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
          
          let toast = this.toastr.success('Passagem cadastrada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/passagens-aereas/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa...');
        }
      }      