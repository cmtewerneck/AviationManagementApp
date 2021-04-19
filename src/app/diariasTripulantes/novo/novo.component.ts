import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiariaTripulanteService } from '../services/diariaTripulante.service';
import { DiariaTripulanteBaseComponent } from '../diariaTripulante-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends DiariaTripulanteBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private diariaTripulanteService: DiariaTripulanteService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
        
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
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          adicionarDiariaTripulante() {
            if (this.diariaTripulanteForm.dirty && this.diariaTripulanteForm.valid) {
              this.diariaTripulante = Object.assign({}, this.diariaTripulante, this.diariaTripulanteForm.value);
              
              // CONVERSÕES DE JSON
              this.diariaTripulante.dataInicio = new Date(this.diariaTripulante.dataInicio);
              if (this.diariaTripulante.dataFim) { this.diariaTripulante.dataFim = new Date(this.diariaTripulante.dataFim); } else { this.diariaTripulante.dataFim = null; }
              this.diariaTripulante.valor = CurrencyUtils.StringParaDecimal(this.diariaTripulante.valor);
              this.diariaTripulante.status = Number(this.diariaTripulante.status);
              // FIM DAS CONVERSÕES
              
              console.log(this.diariaTripulante);
              
              this.diariaTripulanteService.novaDiariaTripulante(this.diariaTripulante)
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
              
              let toast = this.toastr.success('Diária cadastrada com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/diarias-tripulantes/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa...');
            }
          }      