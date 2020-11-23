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
        numeroOrdem: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        tipo: [''],
        aeronaveId: ['', [Validators.required]],
        modelo: [''],
        numeroSerie: [''],
        ttsn: [''],
        tcsnPousos: [''],
        dataAbertura: ['', [Validators.required]],
        motor: [''],
        modeloMotor: [''],
        numeroSerieMotor: [''],
        ttsnMotor: [''],
        tcsnCiclos: [''],
        dataFechamento: [''],
        descricaoServicosProgramados: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
        descricaoServicosRealizados: [''],
        tempoGasto: [''],
        requisicaoMateriais: [''],
        realizadoPor: [''],
        realizadoPorAnac: [''],
        dataRealizacao: [''],
        inspecionadoPor: [''],
        inspecionadoPorAnac: [''],
        dataInspecao: ['']
      });

      this.ordemServicoForm.patchValue({
          id: this.ordemServico.id,
          numeroOrdem: this.ordemServico.numeroOrdem,
          tipo: this.ordemServico.tipo,
          aeronaveId: this.ordemServico.aeronaveId,
          modelo: this.ordemServico.modelo,
          numeroSerie: this.ordemServico.numeroSerie,
          ttsn: this.ordemServico.ttsn,
          tcsnPousos: this.ordemServico.tcsnPousos,
          dataAbertura: this.ordemServico.dataAbertura,
          motor: this.ordemServico.motor,
          modeloMotor: this.ordemServico.modeloMotor,
          numeroSerieMotor: this.ordemServico.numeroSerieMotor,
          ttsnMotor: this.ordemServico.ttsnMotor,
          tcsnCiclos: this.ordemServico.tcsnCiclos,
          dataFechamento: this.ordemServico.dataFechamento,
          descricaoServicosProgramados: this.ordemServico.descricaoServicosProgramados,
          descricaoServicosRealizados: this.ordemServico.descricaoServicosRealizados,
          tempoGasto: this.ordemServico.tempoGasto,
          requisicaoMateriais: this.ordemServico.requisicaoMateriais,
          realizadoPor: this.ordemServico.realizadoPor,
          realizadoPorAnac: this.ordemServico.realizadoPorAnac,
          dataRealizacao: this.ordemServico.dataRealizacao,
          inspecionadoPor: this.ordemServico.inspecionadoPor,
          inspecionadoPorAnac: this.ordemServico.inspecionadoPorAnac,
          dataInspecao: this.ordemServico.dataInspecao
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