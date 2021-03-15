import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdemServicoService } from '../services/ordemServico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdemServicoBaseComponent } from '../ordemServico-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends OrdemServicoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private ordemServicoService: OrdemServicoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.ordemServico = this.route.snapshot.data['ordemServico'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
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
        
        this.ordemServicoForm.patchValue({
          id: this.ordemServico.id,
          numeroOrdem: this.ordemServico.numeroOrdem,
          tipo: this.ordemServico.tipo,
          ttsn: this.ordemServico.ttsn,
          tcsnPousos: this.ordemServico.tcsnPousos,
          dataAbertura: this.ordemServico.dataAbertura,
          ttsnMotor: this.ordemServico.ttsnMotor,
          tcsnCiclos: this.ordemServico.tcsnCiclos,
          dataFechamento: this.ordemServico.dataFechamento,
          requisicaoMateriais: this.ordemServico.requisicaoMateriais,
          realizadoPor: this.ordemServico.realizadoPor,
          realizadoPorAnac: this.ordemServico.realizadoPorAnac,
          dataRealizacao: this.ordemServico.dataRealizacao,
          inspecionadoPor: this.ordemServico.inspecionadoPor,
          inspecionadoPorAnac: this.ordemServico.inspecionadoPorAnac,
          dataInspecao: this.ordemServico.dataInspecao,
          aeronaveId: this.ordemServico.aeronaveId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarOrdemServico() {
        if (this.ordemServicoForm.dirty && this.ordemServicoForm.valid) {
          this.ordemServico = Object.assign({}, this.ordemServico, this.ordemServicoForm.value);
          
          // CONVERSÕES PARA JSON
          this.ordemServico.dataAbertura = new Date(this.ordemServico.dataAbertura);
          if (this.ordemServico.dataFechamento) { this.ordemServico.dataFechamento = new Date(this.ordemServico.dataFechamento); } else { this.ordemServico.dataFechamento = null; }
          if (this.ordemServico.dataRealizacao) { this.ordemServico.dataRealizacao = new Date(this.ordemServico.dataRealizacao); } else { this.ordemServico.dataRealizacao = null; }
          if (this.ordemServico.dataInspecao) { this.ordemServico.dataInspecao = new Date(this.ordemServico.dataInspecao); } else { this.ordemServico.dataInspecao = null; }
          // FIM DAS CONVERSÕES

          console.log(this.ordemServico);
          
          this.ordemServicoService.atualizarOrdemServico(this.ordemServico)
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
          
          let toast = this.toastr.success('Ordem editada com sucesso!', 'Sucesso!');
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