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
       numeroOrdem: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
       tipo: [''],
       aeronaveId: ['', [Validators.required]],
       ttsn: [''],
       tcsnPousos: [''],
       dataAbertura: ['', [Validators.required]],
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
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarOrdemServico() {
    if (this.ordemServicoForm.dirty && this.ordemServicoForm.valid) {
      this.ordemServico = Object.assign({}, this.ordemServico, this.ordemServicoForm.value);

      // this.formResult = JSON.stringify(this.produto);

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

