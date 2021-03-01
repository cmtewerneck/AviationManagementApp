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
          title: ['', [Validators.required, Validators.maxLength(30)]],
          start: [''],
          end: [''],
          allDay: [0],
          editable: [0],
          durationEditable: [0],
          backgroundColor: ['', [Validators.required, Validators.maxLength(20)]],
          textColor: ['', [Validators.required, Validators.maxLength(20)]],
          aeronaveId: ['', [Validators.required]]
        });
        
        this.vooAgendadoForm.patchValue({
          id: this.vooAgendado.id,
          title: this.vooAgendado.title,
          start: this.vooAgendado.start,
          end: this.vooAgendado.end,
          allDay: this.vooAgendado.allDay,
          editable: this.vooAgendado.editable,
          durationEditable: this.vooAgendado.durationEditable,
          backgroundColor: this.vooAgendado.backgroundColor,
          textColor: this.vooAgendado.textColor,
          aeronaveId: this.vooAgendado.aeronaveId
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