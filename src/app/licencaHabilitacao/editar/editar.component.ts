import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LicencaHabilitacaoService } from '../services/licencaHabilitacao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LicencaHabilitacaoBaseComponent } from '../licencaHabilitacao-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends LicencaHabilitacaoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private licencaHabilitacaoService: LicencaHabilitacaoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.licencaHabilitacao = this.route.snapshot.data['licencaHabilitacao'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.licencaHabilitacaoService.obterColaboradores()
        .subscribe(
          colaboradores => this.colaboradores = colaboradores);
            
            this.licencaHabilitacaoForm = this.fb.group({
              titulo: ['', [Validators.required, Validators.maxLength(20)]],
              validade: ['', Validators.required],
              colaboradorId: ['', [Validators.required]]
            });
        
        this.licencaHabilitacaoForm.patchValue({
          id: this.licencaHabilitacao.id,
          validade: this.licencaHabilitacao.validade,
          colaboradorId: this.licencaHabilitacao.colaboradorId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarLicencaHabilitacao() {
        if (this.licencaHabilitacaoForm.dirty && this.licencaHabilitacaoForm.valid) {
          this.licencaHabilitacao = Object.assign({}, this.licencaHabilitacao, this.licencaHabilitacaoForm.value);
          
          // CONVERSÕES DE JSON
          this.licencaHabilitacao.validade = new Date(this.licencaHabilitacao.validade);
          // FIM DAS CONVERSÕES

          console.log(this.licencaHabilitacao);
            
          this.licencaHabilitacaoService.atualizarLicencaHabilitacao(this.licencaHabilitacao)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.licencaHabilitacaoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/licencas-habilitacoes/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }