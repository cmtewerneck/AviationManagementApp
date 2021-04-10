import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreinamentoService } from '../services/treinamento.service';
import { TreinamentoBaseComponent } from '../treinamento-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends TreinamentoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(
    private fb: FormBuilder,
    private treinamentoService: TreinamentoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
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
              modeloAeronave: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
              instrutor: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
              numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
              cargaHoraria: ['', Validators.required],
              tripulanteId: ['', [Validators.required]],
              categoriaId: ['', [Validators.required]]
            });
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          adicionarTreinamento() {
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
              
              this.treinamentoService.novoTreinamento(this.treinamento)
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
              
              let toast = this.toastr.success('Treinamento cadastrado com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/treinamentos/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa...');
            }
          }      