import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../services/produto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ProdutoBaseComponent } from '../produto-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.produto = this.route.snapshot.data['produto'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.produtoService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);
        
        this.produtoForm = this.fb.group({
          fornecedorId: ['', [Validators.required]],
          nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
          descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
          imagem: [''],
          valor: ['', [Validators.required]],
          ativo: [0]
        });
        
        this.produtoForm.patchValue({
          fornecedorId: this.produto.fornecedorId,
          id: this.produto.id,
          nome: this.produto.nome,
          descricao: this.produto.descricao,
          ativo: this.produto.ativo,
          valor: CurrencyUtils.DecimalParaString(this.produto.valor)
        });
        
        this.imagemOriginalSrc = this.imagens + this.produto.imagem;
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarProduto() {
        if (this.produtoForm.dirty && this.produtoForm.valid) {
          this.produto = Object.assign({}, this.produto, this.produtoForm.value);
          
          if (this.imageBase64) {
            this.produto.imagemUpload = this.imageBase64;
            this.produto.imagem = this.imagemNome;
          }
          
          // CONVERSÕES PARA JSON
          this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor);
          this.produto.ativo = this.produto.ativo.toString() == "true";
          // FIM DAS CONVERSÕES
          
          console.log(this.produto);  
          
          this.produtoService.atualizarProduto(this.produto)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.produtoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/produtos/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
        
        upload(file: any) {
          this.imagemNome = file[0].name;
          
          var reader = new FileReader();
          reader.onload = this.manipularReader.bind(this);
          reader.readAsBinaryString(file[0]);
        }
        
        manipularReader(readerEvt: any) {
          var binaryString = readerEvt.target.result;
          this.imageBase64 = btoa(binaryString);
          this.imagemPreview = 'data:image/jpeg;base64,' + this.imageBase64;
        }
        
      }