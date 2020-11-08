import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LegislacaoService } from '../services/legislacao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LegislacaoBaseComponent } from '../legislacao-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends LegislacaoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private legislacaoService: LegislacaoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.legislacao = this.route.snapshot.data['legislacao'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.legislacaoForm = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
        tipo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        numero: ['', [Validators.required]],
        emenda: [''],
        data: [''],
        arquivo: ['']
      });

      this.legislacaoForm.patchValue({
          id: this.legislacao.id,
          titulo: this.legislacao.titulo,
          tipo: this.legislacao.tipo,
          numero: this.legislacao.numero,
          emenda: this.legislacao.emenda,
          data: this.legislacao.data
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarLegislacao() {
        if (this.legislacaoForm.dirty && this.legislacaoForm.valid) {
          this.legislacao = Object.assign({}, this.legislacao, this.legislacaoForm.value);

          this.legislacaoService.atualizarLegislacao(this.legislacao)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.legislacaoForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Legislacao editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/legislacoes/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}