import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VooInstrucaoService } from '../services/vooInstrucao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VooInstrucaoBaseComponent } from '../vooInstrucao-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends VooInstrucaoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private vooInstrucaoService: VooInstrucaoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.vooInstrucao = this.route.snapshot.data['vooInstrucao'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.vooInstrucaoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.vooInstrucaoService.obterInstrutores(3)
        .subscribe(
          colaboradores => this.colaboradores = colaboradores);
          
          this.vooInstrucaoService.obterAlunos()
          .subscribe(
            alunos => this.alunos = alunos);
            
            this.vooInstrucaoForm = this.fb.group({
              data: ['', Validators.required],
              tempoVoo: ['', Validators.required],
              avaliacao: [0],
              observacoes: ['', Validators.maxLength(200)],
              aeronaveId: ['', [Validators.required]],
              alunoId: ['', [Validators.required]],
              instrutorId: ['', [Validators.required]]
            });
            
            this.vooInstrucaoForm.patchValue({
              id: this.vooInstrucao.id,
              data: this.vooInstrucao.data,
              tempoVoo: CurrencyUtils.DecimalParaString(this.vooInstrucao.tempoVoo),
              avaliacao: this.vooInstrucao.avaliacao,
              observacoes: this.vooInstrucao.observacoes,
              aeronaveId: this.vooInstrucao.aeronaveId,
              alunoId: this.vooInstrucao.alunoId,
              instrutorId: this.vooInstrucao.instrutorId
            });
            
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
          
          ngAfterViewInit(): void {
            super.configurarValidacaoFormulario(this.formInputElements);
          }
          
          editarVooInstrucao() {
            if (this.vooInstrucaoForm.dirty && this.vooInstrucaoForm.valid) {
              this.vooInstrucao = Object.assign({}, this.vooInstrucao, this.vooInstrucaoForm.value);
              
              // CONVERSÕES PARA JSON
              this.vooInstrucao.data = new Date(this.vooInstrucao.data);
              this.vooInstrucao.tempoVoo = CurrencyUtils.StringParaDecimal(this.vooInstrucao.tempoVoo);
              this.vooInstrucao.avaliacao = this.vooInstrucao.avaliacao.toString() == "true";
              // FIM DAS CONVERSÕES

              console.log(this.vooInstrucao);
              
              this.vooInstrucaoService.atualizarVooInstrucao(this.vooInstrucao)
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
              
              let toast = this.toastr.success('Instrução editada com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/voos-instrucao/listar-todos']);
                });
              }
            }
            
            processarFalha(fail: any) {
              this.errors = fail.error.errors;
              this.toastr.error('Ocorreu um erro!', 'Opa :(');
            }
          }