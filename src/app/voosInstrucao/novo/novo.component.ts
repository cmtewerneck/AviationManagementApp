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
        
      this.vooInstrucaoService.obterInstrutores(3)
      .subscribe(
        colaboradores => this.colaboradores = colaboradores);
          
      this.vooInstrucaoService.obterAlunos()
      .subscribe(
        alunos => this.alunos = alunos);
            
      this.vooInstrucaoForm = this.fb.group({
        data: ['', Validators.required],
        tempoVoo: ['', Validators.required],
        avaliacao: [true],
        observacoes: ['', Validators.maxLength(200)],
        aeronaveId: ['', [Validators.required]],
        alunoId: ['', [Validators.required]],
        instrutorId: ['', [Validators.required]]
      });

      this.alunoSaldoTotalVoadoForm = this.fb.group({
        id: [''],
        tempoVoo: ['']
      });
    }
          
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
          
    adicionarVooInstrucao() {
      if (this.vooInstrucaoForm.dirty && this.vooInstrucaoForm.valid) {
        this.vooInstrucao = Object.assign({}, this.vooInstrucao, this.vooInstrucaoForm.value);
        
        this.alunoSaldoTotalVoadoForm.patchValue({
          id: this.vooInstrucao.alunoId,
          tempoVoo: this.vooInstrucao.tempoVoo
        })

        this.alunoSaldoTotalVoado = Object.assign({}, this.alunoSaldoTotalVoado, this.alunoSaldoTotalVoadoForm.value);

        // CONVERSÕES PARA JSON
        this.vooInstrucao.data = new Date(this.vooInstrucao.data);
        this.vooInstrucao.tempoVoo = CurrencyUtils.StringParaDecimal(this.vooInstrucao.tempoVoo);
        this.alunoSaldoTotalVoado.tempoVoo = CurrencyUtils.StringParaDecimal(this.alunoSaldoTotalVoado.tempoVoo);
        this.vooInstrucao.avaliacao = this.vooInstrucao.avaliacao.toString() == "true";
        // FIM DAS CONVERSÕES

        console.log(this.vooInstrucao);
        console.log('');
        console.log('ALUNO SALDO TOTAL VOADO ABAIXO:');
        console.log(this.alunoSaldoTotalVoado);
        
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
      
      this.vooInstrucaoService.atualizarAlunoSaldoTotalVoado(this.alunoSaldoTotalVoado)
      .subscribe(
        sucesso => { 
          let toast = this.toastr.success('Voo cadastrado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/voos-instrucao/listar-todos']);
            });
          }
         },
        falha => { this.processarFalha(falha) }
        );
    }
          
    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa...');
    }

}      