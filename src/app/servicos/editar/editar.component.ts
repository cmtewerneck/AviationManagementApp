import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicoService } from '../services/servico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicoBaseComponent } from '../servico-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ServicoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private servicoService: ServicoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.servico = this.route.snapshot.data['servico'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.servicoForm = this.fb.group({
        codigo: ['', [Validators.required, Validators.maxLength(30)]],
        titulo: ['', [Validators.required, Validators.maxLength(30)]],
        custo: ['']
      });
      
      this.servicoForm.patchValue({
        id: this.servico.id,
        codigo: this.servico.codigo,
        titulo: this.servico.titulo,
        custo: CurrencyUtils.DecimalParaString(this.servico.custo)
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarServico() {
      if (this.servicoForm.dirty && this.servicoForm.valid) {
        this.servico = Object.assign({}, this.servico, this.servicoForm.value);
        
        this.servico.custo = CurrencyUtils.StringParaDecimal(this.servico.custo);
        
        this.servicoService.atualizarServico(this.servico)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.servicoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Serviço editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/servicos/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
    }