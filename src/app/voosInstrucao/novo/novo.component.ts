import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { VooInstrucaoService } from '../services/vooInstrucao.service';
import { VooInstrucaoBaseComponent } from '../vooInstrucao-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends VooInstrucaoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private vooInstrucaoService: VooInstrucaoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.vooInstrucaoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.vooInstrucaoService.obterInstrutores()
        .subscribe(
          colaboradores => this.colaboradores = colaboradores);
          
          this.vooInstrucaoService.obterAlunos()
          .subscribe(
            alunos => this.alunos = alunos);
            
            this.vooInstrucaoForm = this.fb.group({
              data: ['', Validators.required],
              tempoVoo: ['', Validators.required],
              avaliacao: [true],
              observacoes: ['', [Validators.required, Validators.maxLength(200)]],
              aeronaveId: ['', [Validators.required]],
              alunoId: ['', [Validators.required]],
              instrutorId: ['', [Validators.required]]
            });
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          adicionarVooInstrucao() {
            if (this.vooInstrucaoForm.dirty && this.vooInstrucaoForm.valid) {
              this.vooInstrucao = Object.assign({}, this.vooInstrucao, this.vooInstrucaoForm.value);
              
              this.vooInstrucao.tempoVoo = CurrencyUtils.StringParaDecimal(this.vooInstrucao.tempoVoo);
              
              this.vooInstrucaoService.novoVooInstrucao(this.vooInstrucao)
              .subscribe(
                sucesso => { this.processarSucesso(sucesso) },
                falha => { this.processarFalha(falha) }
                );
                
                this.mudancasNaoSalvas = false;
              }
            }
            
            processarSucesso(response: any) {
              this.vooInstrucaoForm.reset();
              this.errors = [];
              
              let toast = this.toastr.success('Instrução cadastrada com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/voos-instrucao/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa...');
            }
          }      