import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuprimentoMovimentacaoService } from '../services/suprimentoMovimentacao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { SuprimentoMovimentacaoBaseComponent } from '../suprimentoMovimentacao-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends SuprimentoMovimentacaoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
    private suprimentoMovimentacaoService: SuprimentoMovimentacaoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.suprimentoMovimentacao = this.route.snapshot.data['suprimentoMovimentacao'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.suprimentoMovimentacaoService.obterSuprimentos()
      .subscribe(
        suprimentos => this.suprimentos = suprimentos);
        
        this.suprimentoMovimentacaoForm = this.fb.group({
          data: ['', Validators.required],
          quantidade: ['', Validators.required],
          tipoMovimentacaoEnum: ['', Validators.required],
          itemId: ['', Validators.required]
        });
        
        this.suprimentoMovimentacaoForm.patchValue({
          id: this.suprimentoMovimentacao.id,
          data: this.suprimentoMovimentacao.data,
          quantidade: this.suprimentoMovimentacao.quantidade,
          tipoMovimentacaoEnum: this.suprimentoMovimentacao.tipoMovimentacaoEnum,
          itemId: this.suprimentoMovimentacao.itemId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarSuprimentoMovimentacao() {
        if (this.suprimentoMovimentacaoForm.dirty && this.suprimentoMovimentacaoForm.valid) {
          this.suprimentoMovimentacao = Object.assign({}, this.suprimentoMovimentacao, this.suprimentoMovimentacaoForm.value);
          
          // CONVERSÕES PARA JSON
          this.suprimentoMovimentacao.data = new Date(this.suprimentoMovimentacao.data);
          this.suprimentoMovimentacao.quantidade = Number(this.suprimentoMovimentacao.quantidade);
          this.suprimentoMovimentacao.tipoMovimentacaoEnum = Number(this.suprimentoMovimentacao.tipoMovimentacaoEnum);
          // FIM DAS CONVERSÕES

          console.log(this.suprimentoMovimentacao);
          
          this.suprimentoMovimentacaoService.atualizarSuprimentoMovimentacao(this.suprimentoMovimentacao)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.suprimentoMovimentacaoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Movimentação editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/suprimentosMovimentacao/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
        
      }