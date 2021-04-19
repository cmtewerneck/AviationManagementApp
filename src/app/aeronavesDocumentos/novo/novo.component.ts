import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDocumentoService } from '../services/aeronaveDocumento.service';
import { AeronaveDocumentoBaseComponent } from '../aeronaveDocumento-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveDocumentoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private aeronaveDocumentoService: AeronaveDocumentoService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.aeronaveDocumentoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.aeronaveDocumentoForm = this.fb.group({
          aeronaveId: ['', [Validators.required]],
          titulo: ['', [Validators.required, Validators.maxLength(50)]],
          dataEmissao: [''],
          dataValidade: ['', Validators.required],
          arquivo: ['']
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarAeronaveDocumento() {
        if (this.aeronaveDocumentoForm.dirty && this.aeronaveDocumentoForm.valid) {
          this.aeronaveDocumento = Object.assign({}, this.aeronaveDocumento, this.aeronaveDocumentoForm.value);
          
          // CONVERSÕES PARA JSON
          this.aeronaveDocumento.dataValidade = new Date(this.aeronaveDocumento.dataValidade);
          if (this.aeronaveDocumento.dataEmissao) { this.aeronaveDocumento.dataEmissao = new Date(this.aeronaveDocumento.dataEmissao); } else { this.aeronaveDocumento.dataEmissao = null; }
          // FIM DAS CONVERSÕES

          console.log(this.aeronaveDocumento);

          this.aeronaveDocumentoService.novaAeronaveDocumento(this.aeronaveDocumento)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.aeronaveDocumentoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Documento adicionado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/aeronaves-documentos/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
}
      
      