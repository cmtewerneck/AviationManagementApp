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
          title: ['', [Validators.required, Validators.maxLength(30)]],
          start: [''],
          end: [''],
          allDay: [true],
          editable: [true],
          durationEditable: [true],
          backgroundColor: ['', [Validators.required, Validators.maxLength(20)]],
          textColor: ['', [Validators.required, Validators.maxLength(20)]],
          aeronaveId: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarVooAgendado() {
        if (this.vooAgendadoForm.dirty && this.vooAgendadoForm.valid) {
          this.vooAgendado = Object.assign({}, this.vooAgendado, this.vooAgendadoForm.value);
          
          // CONVERSÃO PARA JSON
          this.vooAgendado.start = new Date(this.vooAgendado.start);
          this.vooAgendado.end = new Date(this.vooAgendado.end);
          this.vooAgendado.allDay = this.vooAgendado.allDay.toString() == "true";
          this.vooAgendado.editable = this.vooAgendado.editable.toString() == "true";
          this.vooAgendado.durationEditable = this.vooAgendado.durationEditable.toString() == "true";
          // FIM DA CONVERSÃO

          console.log(this.vooAgendado);

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
          
          let toast = this.toastr.success('Voo agendado com sucesso!', 'Sucesso!');
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