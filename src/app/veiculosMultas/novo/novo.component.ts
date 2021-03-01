import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { VeiculoMultaService } from '../services/veiculoMulta.service';
import { VeiculoMultaBaseComponent } from '../veiculoMulta-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends VeiculoMultaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private veiculoMultaService: VeiculoMultaService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.veiculoMultaService.obterVeiculos()
      .subscribe(
        veiculos => this.veiculos = veiculos);
        
        this.veiculoMultaForm = this.fb.group({
          data: ['', [Validators.required]],
          autoInfracao: ['', [Validators.required, Validators.maxLength(30)]],
          responsavel: ['', Validators.maxLength(30)],
          classificacao: ['', Validators.maxLength(30)],
          descricao: ['', [Validators.required, Validators.maxLength(50)]],
          situacao: [true],
          valor: [''],
          veiculoId: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarVeiculoMulta() {
        if (this.veiculoMultaForm.dirty && this.veiculoMultaForm.valid) {
          this.veiculoMulta = Object.assign({}, this.veiculoMulta, this.veiculoMultaForm.value);
          
          this.veiculoMulta.valor = CurrencyUtils.StringParaDecimal(this.veiculoMulta.valor);
          // this.formResult = JSON.stringify(this.produto);
          
          this.veiculoMultaService.novoVeiculoMulta(this.veiculoMulta)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.veiculoMultaForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Multa adicionada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/veiculos-multas/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }