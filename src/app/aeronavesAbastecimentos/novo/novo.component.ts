import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveAbastecimentoService } from '../services/aeronaveAbastecimento.service';
import { AeronaveAbastecimentoBaseComponent } from '../aeronaveAbastecimento-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveAbastecimentoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private aeronaveAbastecimentoService: AeronaveAbastecimentoService,
              private router: Router,
              private toastr: ToastrService) {super(); }

  ngOnInit(): void {

     this.aeronaveAbastecimentoService.obterAeronaves()
       .subscribe(
         aeronaves => this.aeronaves = aeronaves);

     this.aeronaveAbastecimentoForm = this.fb.group({
        aeronaveId: ['', [Validators.required]],
        data: ['', [Validators.required]],
        litros: ['', [Validators.required]],
        local: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        cupom: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        notaFiscal: [''],
        fornecedora: [''],
        responsavel: [''],
        observacoes: ['']
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarAeronaveAbastecimento() {
    if (this.aeronaveAbastecimentoForm.dirty && this.aeronaveAbastecimentoForm.valid) {
      this.aeronaveAbastecimento = Object.assign({}, this.aeronaveAbastecimento, this.aeronaveAbastecimentoForm.value);

      this.aeronaveAbastecimentoService.novaAeronaveAbastecimento(this.aeronaveAbastecimento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.aeronaveAbastecimentoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Abastecimento adicionado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/aeronaves-abastecimentos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

