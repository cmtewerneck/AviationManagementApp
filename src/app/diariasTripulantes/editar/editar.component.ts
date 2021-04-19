import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiariaTripulanteService } from '../services/diariaTripulante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiariaTripulanteBaseComponent } from '../diariaTripulante-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends DiariaTripulanteBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private diariaTripulanteService: DiariaTripulanteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.diariaTripulante = this.route.snapshot.data['diariaTripulante'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.diariaTripulanteService.obterColaboradores(2)
        .subscribe(
          tripulantes => this.tripulantes = tripulantes);
            
            this.diariaTripulanteForm = this.fb.group({
              dataInicio: ['', Validators.required],
              dataFim: [''],
              valor: ['0', Validators.required],
              finalidade: ['', [Validators.required, Validators.maxLength(500)]],
              status: ['', Validators.required],
              formaPagamento: ['', Validators.maxLength(30)],
              tripulanteId: ['', Validators.required]
            });
        
        this.diariaTripulanteForm.patchValue({
          id: this.diariaTripulante.id,
          dataInicio: this.diariaTripulante.dataInicio,
          dataFim: this.diariaTripulante.dataFim,
          valor: CurrencyUtils.DecimalParaString(this.diariaTripulante.valor),
          finalidade: this.diariaTripulante.finalidade,
          status: this.diariaTripulante.status,
          formaPagamento: this.diariaTripulante.formaPagamento,
          tripulanteId: this.diariaTripulante.tripulanteId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarDiariaTripulante() {
        if (this.diariaTripulanteForm.dirty && this.diariaTripulanteForm.valid) {
          this.diariaTripulante = Object.assign({}, this.diariaTripulante, this.diariaTripulanteForm.value);
          
          // CONVERSÕES DE JSON
          this.diariaTripulante.dataInicio = new Date(this.diariaTripulante.dataInicio);
          if (this.diariaTripulante.dataFim) { this.diariaTripulante.dataFim = new Date(this.diariaTripulante.dataFim); } else { this.diariaTripulante.dataFim = null; }
          this.diariaTripulante.valor = CurrencyUtils.StringParaDecimal(this.diariaTripulante.valor);
          this.diariaTripulante.status = Number(this.diariaTripulante.status);
          // FIM DAS CONVERSÕES

          console.log(this.diariaTripulante);
            
          this.diariaTripulanteService.atualizarDiariaTripulante(this.diariaTripulante)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.diariaTripulanteForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Diária editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/diarias-tripulantes/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }

}