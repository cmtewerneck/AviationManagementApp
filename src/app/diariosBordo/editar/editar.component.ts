import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiarioBordoService } from '../services/diarioBordo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiarioBordoBaseComponent } from '../diarioBordo-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends DiarioBordoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private diarioBordoService: DiarioBordoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.diarioBordo = this.route.snapshot.data['diarioBordo'];
    }

    ngOnInit(): void {

      this.spinner.show();

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

      this.diarioBordoForm.patchValue({
          id: this.diarioBordo.id,
          data: this.diarioBordo.data,
          base: this.diarioBordo.base,
          comandante: this.diarioBordo.comandante,
          comandanteCanac: this.diarioBordo.comandanteCanac,
          copiloto: this.diarioBordo.copiloto,
          copilotoCanac: this.diarioBordo.copilotoCanac,
          matricula: this.diarioBordo.matricula,
          de: this.diarioBordo.de,
          para: this.diarioBordo.para,
          horaAcionamento: this.diarioBordo.horaAcionamento,
          horaDecolagem: this.diarioBordo.horaDecolagem,
          horaPouso: this.diarioBordo.horaPouso,
          horaCorte: this.diarioBordo.horaCorte,
          totalDiurno: this.diarioBordo.totalDiurno,
          totalNoturno: this.diarioBordo.totalNoturno,
          totalNavegacao: this.diarioBordo.totalNavegacao,
          totalIfr: this.diarioBordo.totalIfr,
          totalDecimal: this.diarioBordo.totalDecimal,
          pousos: this.diarioBordo.pousos,
          pob: this.diarioBordo.pob,
          combustivelAbastecido: this.diarioBordo.combustivelAbastecido,
          combustivelDecolagem: this.diarioBordo.combustivelDecolagem,
          cupomAbastecimento: this.diarioBordo.cupomAbastecimento,
          natureza: this.diarioBordo.natureza,
          preVoo: this.diarioBordo.preVoo,
          posVoo: this.diarioBordo.posVoo,
          chefeMissao: this.diarioBordo.chefeMissao,
          observacoes: this.diarioBordo.observacoes,
          discrepancias: this.diarioBordo.discrepancias,
          acoesCorretivas: this.diarioBordo.acoesCorretivas,
          mecanicoResponsavel: this.diarioBordo.mecanicoResponsavel

        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarDiarioBordo() {
        if (this.diarioBordoForm.dirty && this.diarioBordoForm.valid) {
          this.diarioBordo = Object.assign({}, this.diarioBordo, this.diarioBordoForm.value);

          this.diarioBordoService.atualizarDiarioBordo(this.diarioBordo)
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

          let toast = this.toastr.success('Diário editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/diarios-bordo/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}