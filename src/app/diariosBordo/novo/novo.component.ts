import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiarioBordoService } from '../services/diarioBordo.service';
import { DiarioBordoBaseComponent } from '../diarioBordo-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends DiarioBordoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private diarioBordoService: DiarioBordoService,
              private router: Router,
              private toastr: ToastrService) {super(); }

  ngOnInit(): void {

      this.diarioBordoForm = this.fb.group({
       data: ['', [Validators.required]],
       base: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
       comandante: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
       comandanteCanac: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
       copiloto: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
       copilotoCanac: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
       matricula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
       de: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
       para: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
       horaAcionamento: ['', [Validators.required]],
       horaDecolagem: ['', [Validators.required]],
       horaPouso: ['', [Validators.required]],
       horaCorte: ['', [Validators.required]],
       totalDiurno: [''],
       totalNoturno: [''],
       totalIfr: [''],
       totalDecimal: ['', [Validators.required]],
       totalNavegacao: [''],
       pousos: ['', [Validators.required]],
       pob: ['', [Validators.required]],
       combustivelDecolagem: ['', [Validators.required]],
       combustivelAbastecido: [''],
       cupomAbastecimento: ['', Validators.maxLength(20)],
       natureza: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
       preVoo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
       posVoo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
       chefeMissao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
       observacoes: ['', [Validators.maxLength(500)]],
       discrepancias: ['', [Validators.maxLength(500)]],
       acoesCorretivas: ['', [Validators.maxLength(500)]],
       mecanicoResponsavel: ['', [Validators.maxLength(100)]]
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarDiarioBordo() {
    if (this.diarioBordoForm.dirty && this.diarioBordoForm.valid) {
      this.diarioBordo = Object.assign({}, this.diarioBordo, this.diarioBordoForm.value);

      this.diarioBordoService.novoDiarioBordo(this.diarioBordo)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.diarioBordoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Diário cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/diarios-bordo/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa...');
  }
}

