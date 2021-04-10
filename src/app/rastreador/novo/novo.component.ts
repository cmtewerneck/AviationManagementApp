import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RastreadorService } from '../services/rastreador.service';
import { RastreadorBaseComponent } from '../rastreador-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends RastreadorBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private rastreadorService: RastreadorService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.rastreadorService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.rastreadorForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          codigo: ['', [Validators.required, Validators.maxLength(20)]],
          modelo: ['', Validators.maxLength(50)]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarRastreador() {
        if (this.rastreadorForm.dirty && this.rastreadorForm.valid) {
          this.rastreador = Object.assign({}, this.rastreador, this.rastreadorForm.value);
          
          // CONVERSÕES PARA JSON
          // FIM DAS CONVERSÕES

          console.log(this.rastreador);

          this.rastreadorService.novoRastreador(this.rastreador)
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
          
          let toast = this.toastr.success('Rastreador adicionado com sucesso!', 'Sucesso!');
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
      
      