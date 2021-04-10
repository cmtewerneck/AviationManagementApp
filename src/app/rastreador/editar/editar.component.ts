import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RastreadorService } from '../services/rastreador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RastreadorBaseComponent } from '../rastreador-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends RastreadorBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private rastreadorService: RastreadorService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.rastreador = this.route.snapshot.data['rastreador'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.rastreadorService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);

        this.rastreadorForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          codigo: ['', [Validators.required, Validators.maxLength(20)]],
          modelo: ['', Validators.maxLength(50)]
        });

      this.rastreadorForm.patchValue({
          id: this.rastreador.id,
          aeronaveId: this.rastreador.aeronaveId,
          codigo: this.rastreador.codigo,
          modelo: this.rastreador.modelo
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarRastreador() {
        if (this.rastreadorForm.dirty && this.rastreadorForm.valid) {
          this.rastreador = Object.assign({}, this.rastreador, this.rastreadorForm.value);

          // IMPLEMENTAR EDIÇÃO DO ARQUIVO

          // CONVERSÕES PARA JSON
          // FIM DAS CONVERSÕES

          console.log(this.rastreador);

          this.rastreadorService.atualizarRastreador(this.rastreador)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.rastreadorForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Rastreador editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/rastreadores/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }

}