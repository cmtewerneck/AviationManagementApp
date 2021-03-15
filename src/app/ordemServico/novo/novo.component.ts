import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdemServicoService } from '../services/ordemServico.service';
import { OrdemServicoBaseComponent } from '../ordemServico-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends OrdemServicoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private ordemServicoService: OrdemServicoService,
    private router: Router,
    private toastr: ToastrService) { super(); }
    
    ngOnInit(): void {
      
      this.ordemServicoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.ordemServicoForm = this.fb.group({
          numeroOrdem: ['', [Validators.required, Validators.maxLength(20)]],
          tipo: ['', Validators.maxLength(20)],
          ttsn: ['', Validators.maxLength(20)],
          tcsnPousos: ['', Validators.maxLength(20)],
          dataAbertura: ['', [Validators.required]],
          ttsnMotor: ['', Validators.maxLength(20)],
          tcsnCiclos: ['', Validators.maxLength(20)],
          dataFechamento: [''],
          requisicaoMateriais: ['', Validators.maxLength(300)],
          realizadoPor: ['', Validators.maxLength(20)],
          realizadoPorAnac: ['', [Validators.minLength(6), Validators.maxLength(6)]],
          dataRealizacao: [''],
          inspecionadoPor: ['', Validators.maxLength(20)],
          inspecionadoPorAnac: ['', [Validators.minLength(6), Validators.maxLength(6)]],
          dataInspecao: [''],
          aeronaveId: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarOrdemServico() {
        if (this.ordemServicoForm.dirty && this.ordemServicoForm.valid) {
          this.ordemServico = Object.assign({}, this.ordemServico, this.ordemServicoForm.value);
          
          // this.formResult = JSON.stringify(this.produto);

          // CONVERSÕES PARA JSON
          this.ordemServico.dataAbertura = new Date(this.ordemServico.dataAbertura);
          if (this.ordemServico.dataFechamento) { this.ordemServico.dataFechamento = new Date(this.ordemServico.dataFechamento); } else { this.ordemServico.dataFechamento = null; }
          if (this.ordemServico.dataRealizacao) { this.ordemServico.dataRealizacao = new Date(this.ordemServico.dataRealizacao); } else { this.ordemServico.dataRealizacao = null; }
          if (this.ordemServico.dataInspecao) { this.ordemServico.dataInspecao = new Date(this.ordemServico.dataInspecao); } else { this.ordemServico.dataInspecao = null; }
          // FIM DAS CONVERSÕES

          console.log(this.ordemServico);
          
          this.ordemServicoService.novoOrdemServico(this.ordemServico)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.ordemServicoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Ordem de Serviço cadastrada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/ordem-servico/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }