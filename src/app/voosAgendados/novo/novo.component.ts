import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VooAgendadoService } from '../services/vooAgendado.service';
import { VooAgendadoBaseComponent } from '../vooAgendado-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends VooAgendadoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private vooAgendadoService: VooAgendadoService,
              private router: Router,
              private toastr: ToastrService) {super(); }

  ngOnInit(): void {

     this.vooAgendadoService.obterAeronaves()
       .subscribe(
         aeronaves => this.aeronaves = aeronaves);

     this.vooAgendadoForm = this.fb.group({
       aeronaveId: ['', [Validators.required]],
       descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
       comecaEm: ['', [Validators.required]],
       terminaEm: ['', [Validators.required]],
       diaTodo: [true]
     });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarVooAgendado() {
    if (this.vooAgendadoForm.dirty && this.vooAgendadoForm.valid) {
      this.vooAgendado = Object.assign({}, this.vooAgendado, this.vooAgendadoForm.value);

      this.vooAgendadoService.novoVooAgendado(this.vooAgendado)
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

    let toast = this.toastr.success('Agendamento cadastrado com sucesso!', 'Sucesso!');
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
