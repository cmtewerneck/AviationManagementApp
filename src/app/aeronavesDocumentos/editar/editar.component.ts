import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDocumentoService } from '../services/aeronaveDocumento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AeronaveDocumentoBaseComponent } from '../aeronaveDocumento-form.base.component';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AeronaveDocumentoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
              private aeronaveDocumentoService: AeronaveDocumentoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.aeronaveDocumento = this.route.snapshot.data['aeronaveDocumento'];
    }

    ngOnInit(): void {

      this.spinner.show();

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

      this.aeronaveDocumentoForm.patchValue({
          id: this.aeronaveDocumento.id,
          aeronaveId: this.aeronaveDocumento.aeronaveId,
          titulo: this.aeronaveDocumento.titulo,
          dataEmissao: this.aeronaveDocumento.dataEmissao,
          dataValidade: this.aeronaveDocumento.dataValidade,
          arquivo: this.aeronaveDocumento.arquivo
        })

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarAeronaveDocumento() {
        if (this.aeronaveDocumentoForm.dirty && this.aeronaveDocumentoForm.valid) {
          this.aeronaveDocumento = Object.assign({}, this.aeronaveDocumento, this.aeronaveDocumentoForm.value);

        // CONVERSÕES PARA JSON
        this.aeronaveDocumento.dataValidade = new Date(this.aeronaveDocumento.dataValidade);
        if (this.aeronaveDocumento.dataEmissao) { this.aeronaveDocumento.dataEmissao = new Date(this.aeronaveDocumento.dataEmissao); } else { this.aeronaveDocumento.dataEmissao = null; }
        // FIM DAS CONVERSÕES

          console.log(this.aeronaveDocumento);

          this.aeronaveDocumentoService.atualizarAeronaveDocumento(this.aeronaveDocumento)
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

          let toast = this.toastr.success('Documento editado com sucesso!', 'Sucesso!');
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