import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VooAgendadoService } from '../services/vooAgendado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VooAgendadoBaseComponent } from '../vooAgendado-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends VooAgendadoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
              private vooAgendadoService: VooAgendadoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.vooAgendado = this.route.snapshot.data['vooAgendado'];
    }

    ngOnInit(): void {

      this.spinner.show();

      this.vooAgendadoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);

      this.vooAgendadoForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          comecaEm: ['', [Validators.required]],
          terminaEm: ['', [Validators.required]],
          diaTodo: [0]
        });

      this.vooAgendadoForm.patchValue({
          aeronaveId: this.vooAgendado.aeronaveId,
          id: this.vooAgendado.id,
          descricao: this.vooAgendado.descricao,
          comecaEm: this.vooAgendado.comecaEm,
          terminaEm: this.vooAgendado.terminaEm,
          diaTodo: this.vooAgendado.diaTodo
        });

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarVooAgendado() {
        if (this.vooAgendadoForm.dirty && this.vooAgendadoForm.valid) {
          this.vooAgendado = Object.assign({}, this.vooAgendado, this.vooAgendadoForm.value);

          this.vooAgendadoService.atualizarVooAgendado(this.vooAgendado)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.vooAgendadoForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Agendamento editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/voos-agendados/listar-todos']);
            });
          }
        }

        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}