import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EscalaService } from '../services/escala.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EscalaBaseComponent } from '../escala-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends EscalaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private escalaService: EscalaService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.escala = this.route.snapshot.data['escala'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.escalaService.obterTripulantes(2)
        .subscribe(
          tripulantes => this.tripulantes = tripulantes);

      this.escalaForm = this.fb.group({
        data: ['', Validators.required],
        status: ['', Validators.required],
        tripulanteId: ['', Validators.required]
      });
      
      this.escalaForm.patchValue({
        id: this.escala.id,
        data: this.escala.data,
        status: this.escala.status,        
        tripulanteId: this.escala.tripulanteId
      });
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarEscala() {
      if (this.escalaForm.dirty && this.escalaForm.valid) {
        this.escala = Object.assign({}, this.escala, this.escalaForm.value);
        
        // CONVERSÕES PARA JSON
        this.escala.data = new Date(this.escala.data);
        this.escala.status = Number(this.escala.status);
        // FIM DAS CONVERSÕES

        this.escalaService.atualizarEscala(this.escala)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.escalaForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Escala editada com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/escalas/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa :(');
      }
}