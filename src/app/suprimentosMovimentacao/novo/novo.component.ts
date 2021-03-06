import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuprimentoMovimentacaoService } from '../services/suprimentoMovimentacao.service';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';
import { SuprimentoMovimentacaoBaseComponent } from '../suprimentoMovimentacao-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends SuprimentoMovimentacaoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageUrl: string;
  imagemNome: string;
  
  constructor(private fb: FormBuilder,
    private suprimentoMovimentacaoService: SuprimentoMovimentacaoService,
    private router: Router,
    private toastr: ToastrService) {super();}
    
    ngOnInit(): void {
      this.suprimentoMovimentacaoService.obterSuprimentos()
      .subscribe(
        suprimentos => this.suprimentos = suprimentos);
        
        this.suprimentoMovimentacaoForm = this.fb.group({
          data: ['', Validators.required],
          quantidade: ['', Validators.required],
          tipoMovimentacaoEnum: ['', Validators.required],
          itemId: ['', Validators.required]
        });

        this.suprimentoQuantidadeForm = this.fb.group({
          id: [''],
          quantidade: ['']
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarSuprimentoMovimentacao() {
        if (this.suprimentoMovimentacaoForm.dirty && this.suprimentoMovimentacaoForm.valid) {
          this.suprimentoMovimentacao = Object.assign({}, this.suprimentoMovimentacao, this.suprimentoMovimentacaoForm.value);

          this.suprimentoQuantidadeForm.patchValue({
            id: this.suprimentoMovimentacao.itemId,
            quantidade: this.suprimentoMovimentacao.quantidade
          })

          this.suprimentoQuantidade = Object.assign({}, this.suprimentoQuantidade, this.suprimentoQuantidadeForm.value);

          //this.suprimentoQuantidade = Object.assign({}, this.suprimentoQuantidade, this.suprimentoQuantidadeForm.value);
          
          // this.formResult = JSON.stringify(this.produto);

          // CONVERSÕES PARA JSON
          this.suprimentoMovimentacao.data = new Date(this.suprimentoMovimentacao.data);
          this.suprimentoMovimentacao.quantidade = Number(this.suprimentoMovimentacao.quantidade);
          this.suprimentoQuantidade.quantidade = Number(this.suprimentoQuantidade.quantidade);
          this.suprimentoMovimentacao.tipoMovimentacaoEnum = Number(this.suprimentoMovimentacao.tipoMovimentacaoEnum);
          // FIM DAS CONVERSÕES

          console.log(this.suprimentoMovimentacao);
          console.log('');
          console.log('SUPRIMENTO QUANTIDADE ABAIXO:');
          console.log(this.suprimentoQuantidade);
          
          this.suprimentoMovimentacaoService.novoSuprimentoMovimentacao(this.suprimentoMovimentacao)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          // this.suprimentoMovimentacaoService.atualizarSuprimentoQuantidade(this.suprimentoQuantidade, this.suprimentoMovimentacao.tipoMovimentacaoEnum)
          // .subscribe(
          //   sucesso => { this.processarSucesso(sucesso) },
          //   falha => { this.processarFalha(falha) }
          //   );
            
            this.mudancasNaoSalvas = false;
          }
      }
        
        processarSucesso(response: any) {
          this.suprimentoMovimentacaoForm.reset();
          this.errors = [];

          this.suprimentoMovimentacaoService.atualizarSuprimentoQuantidade(this.suprimentoQuantidade, this.suprimentoMovimentacao.tipoMovimentacaoEnum)
          .subscribe(
            sucesso => { 
              let toast = this.toastr.success('Movimentação cadastrada com sucesso!', 'Sucesso!');
              if (toast) {
                toast.onHidden.subscribe(() => {
                  this.router.navigate(['/suprimentos-movimentacoes/listar-todos']);
                });
              }
             },
            falha => { this.processarFalha(falha) }
            );
          
          // let toast = this.toastr.success('Movimentação cadastrada com sucesso!', 'Sucesso!');
          // if (toast) {
          //   toast.onHidden.subscribe(() => {
          //     this.router.navigate(['/suprimentos-movimentacoes/listar-todos']);
          //   });
          // }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
        
      }