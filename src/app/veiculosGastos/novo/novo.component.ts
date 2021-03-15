import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { VeiculoGastoService } from '../services/veiculoGasto.service';
import { VeiculoGastoBaseComponent } from '../veiculoGasto-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends VeiculoGastoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private veiculoGastoService: VeiculoGastoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.veiculoGastoService.obterVeiculos()
      .subscribe(
        veiculos => this.veiculos = veiculos);
        
        this.veiculoGastoService.ObterColaboradores(5)
        .subscribe(
          colaboradores => this.colaboradores = colaboradores);
          
          this.veiculoGastoForm = this.fb.group({
            data: ['', [Validators.required]],
            descricao: ['', [Validators.required, Validators.maxLength(50)]],
            situacao: [true],
            valor: ['', [Validators.required]],
            veiculoId: ['', [Validators.required]],
            motoristaId: ['', [Validators.required]]
          });
        }
        
        ngAfterViewInit(): void {
          super.configurarValidacaoFormulario(this.formInputElements);
        }
        
        adicionarVeiculoGasto() {
          if (this.veiculoGastoForm.dirty && this.veiculoGastoForm.valid) {
            this.veiculoGasto = Object.assign({}, this.veiculoGasto, this.veiculoGastoForm.value);
            
            // CONVERSÕES PARA JSON
            this.veiculoGasto.data = new Date(this.veiculoGasto.data);
            this.veiculoGasto.situacao = this.veiculoGasto.situacao.toString() == "true";
            this.veiculoGasto.valor = CurrencyUtils.StringParaDecimal(this.veiculoGasto.valor);
            // FIM DAS CONVERSÕES

            console.log(this.veiculoGasto);
            
            this.veiculoGastoService.novoVeiculoGasto(this.veiculoGasto)
            .subscribe(
              sucesso => { this.processarSucesso(sucesso) },
              falha => { this.processarFalha(falha) }
              );
              
              this.mudancasNaoSalvas = false;
            }
          }
          
          processarSucesso(response: any) {
            this.veiculoGastoForm.reset();
            this.errors = [];
            
            let toast = this.toastr.success('Gasto adicionado com sucesso!', 'Sucesso!');
            if (toast) {
              toast.onHidden.subscribe(() => {
                this.router.navigate(['/veiculos-gastos/listar-todos']);
              });
            }
          }
          
          processarFalha(fail: any) {
            this.errors = fail.error.errors;
            this.toastr.error('Ocorreu um erro!', 'Opa :(');
          }
        }