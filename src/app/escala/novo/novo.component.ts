import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EscalaService } from '../services/escala.service';
import { EscalaBaseComponent } from '../escala-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends EscalaBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private escalaService: EscalaService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.escalaService.obterTripulantes(2)
        .subscribe(
          tripulantes => this.tripulantes = tripulantes);

      this.escalaForm = this.fb.group({
        data: ['', Validators.required],
        status: ['', Validators.required],
        tripulanteId: ['', Validators.required]
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarEscala() {
      if (this.escalaForm.dirty && this.escalaForm.valid) {
        this.escala = Object.assign({}, this.escala, this.escalaForm.value);
        
        // this.formResult = JSON.stringify(this.produto);
        // CONVERSÕES PARA JSON
        this.escala.data = new Date(this.escala.data);
        this.escala.status = Number(this.escala.status);
        // FIM DAS CONVERSÕES

        this.escalaService.novaEscala(this.escala)
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
        
        let toast = this.toastr.success('Escala cadastrada com sucesso!', 'Sucesso!');
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