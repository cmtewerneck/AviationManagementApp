import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeiculoMultaService } from '../services/veiculoMulta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VeiculoMultaBaseComponent } from '../veiculoMulta-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends VeiculoMultaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private veiculoMultaService: VeiculoMultaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.veiculoMulta = this.route.snapshot.data['veiculoMulta'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.veiculoMultaService.obterVeiculos()
      .subscribe(
        veiculos => this.veiculos = veiculos);
        
        this.veiculoMultaForm = this.fb.group({
          data: ['', [Validators.required]],
          autoInfracao: ['', [Validators.required, Validators.maxLength(30)]],
          responsavel: ['', Validators.maxLength(30)],
          classificacao: ['', Validators.maxLength(30)],
          descricao: ['', [Validators.required, Validators.maxLength(50)]],
          situacao: [0],
          valor: [''],
          veiculoId: ['', [Validators.required]]
        });
        
        this.veiculoMultaForm.patchValue({
          id: this.veiculoMulta.id,
          data: this.veiculoMulta.data,
          autoInfracao: this.veiculoMulta.autoInfracao,
          responsavel: this.veiculoMulta.responsavel,
          classificacao: this.veiculoMulta.classificacao,
          descricao: this.veiculoMulta.descricao,
          situacao: this.veiculoMulta.situacao,
          valor: CurrencyUtils.DecimalParaString(this.veiculoMulta.valor),
          veiculoId: this.veiculoMulta.veiculoId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarVeiculoMulta() {
        if (this.veiculoMultaForm.dirty && this.veiculoMultaForm.valid) {
          this.veiculoMulta = Object.assign({}, this.veiculoMulta, this.veiculoMultaForm.value);
          
          // CONVERSÕES PARA JSON
          this.veiculoMulta.data = new Date(this.veiculoMulta.data);
          this.veiculoMulta.situacao = this.veiculoMulta.situacao.toString() == "true";
          this.veiculoMulta.valor = CurrencyUtils.StringParaDecimal(this.veiculoMulta.valor);
          // FIM DAS CONVERSÕES
          
          // this.formResult = JSON.stringify(this.produto);
          
          console.log(this.veiculoMulta);
          
          this.veiculoMultaService.atualizarVeiculoMulta(this.veiculoMulta)
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
          
          let toast = this.toastr.success('Multa editada com sucesso!', 'Sucesso!');
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