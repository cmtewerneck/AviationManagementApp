import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreinamentoService } from '../services/treinamento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TreinamentoBaseComponent } from '../treinamento-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends TreinamentoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private treinamentoService: TreinamentoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.treinamento = this.route.snapshot.data['treinamento'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.treinamentoService.obterTripulantes(2)
      .subscribe(
        tripulantes => this.tripulantes = tripulantes);

        this.treinamentoService.obterCategorias()
        .subscribe(
          categorias => this.categorias = categorias);
        
        this.treinamentoForm = this.fb.group({
          dataInicio: ['', [Validators.required]],
          dataTermino: [''],
          classificacaoTreinamento: ['', Validators.required],
          tipoTreinamento: ['', Validators.required],
          tipoClasse: ['', Validators.required],
          modeloAeronave: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          instrutor: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
          numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
          cargaHoraria: ['', Validators.required],
          tripulanteId: ['', [Validators.required]],
          categoriaId: ['', [Validators.required]]
        });
        
        this.treinamentoForm.patchValue({
          id: this.treinamento.id,
          dataInicio: this.treinamento.dataInicio,
          dataTermino: this.treinamento.dataTermino,
          classificacaoTreinamento: this.treinamento.classificacaoTreinamento,
          tipoTreinamento: this.treinamento.tipoTreinamento,
          tipoClasse: this.treinamento.tipoClasse,
          modeloAeronave: this.treinamento.modeloAeronave,
          instrutor: this.treinamento.instrutor,
          numero: this.treinamento.numero,
          cargaHoraria: CurrencyUtils.DecimalParaString(this.treinamento.cargaHoraria),
          tripulanteId: this.treinamento.tripulanteId,
          categoriaId: this.treinamento.categoriaId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarTreinamento() {
        if (this.treinamentoForm.dirty && this.treinamentoForm.valid) {
          this.treinamento = Object.assign({}, this.treinamento, this.treinamentoForm.value);
          
          // CONVERSÕES DE JSON
          this.treinamento.dataInicio = new Date(this.treinamento.dataInicio);
          if (this.treinamento.dataTermino) { this.treinamento.dataTermino = new Date(this.treinamento.dataTermino); } else { this.treinamento.dataTermino = null; }
          this.treinamento.classificacaoTreinamento = Number(this.treinamento.classificacaoTreinamento);
          this.treinamento.tipoClasse = Number(this.treinamento.tipoClasse);
          this.treinamento.tipoTreinamento = Number(this.treinamento.tipoTreinamento);
          this.treinamento.cargaHoraria = CurrencyUtils.StringParaDecimal(this.treinamento.cargaHoraria);
          // FIM DAS CONVERSÕES

          console.log(this.treinamento);
            
          this.treinamentoService.atualizarTreinamento(this.treinamento)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.treinamentoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Treinamento editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/treinamentos/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }