import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LegislacaoService } from '../services/legislacao.service';
import { LegislacaoBaseComponent } from '../legislacao-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends LegislacaoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private legislacaoService: LegislacaoService,
              private router: Router,
              private toastr: ToastrService) {super(); }

  ngOnInit(): void {

      this.legislacaoForm = this.fb.group({
       titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
       tipo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
       numero: ['', [Validators.required]],
       emenda: [''],
       data: [''],
       arquivo: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarLegislacao() {
    if (this.legislacaoForm.dirty && this.legislacaoForm.valid) {
      this.legislacao = Object.assign({}, this.legislacao, this.legislacaoForm.value);

      this.legislacaoService.novoLegislacao(this.legislacao)
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

    let toast = this.toastr.success('Legislacao cadastrada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/legislacoes/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa...');
  }
}

