import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService } from '../services/estoque.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EstoqueBaseComponent } from '../estoque-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends EstoqueBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
              private estoqueService: EstoqueService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.estoque = this.route.snapshot.data['estoque'];
    }
    
    ngOnInit(): void {

      this.spinner.show();

      this.estoqueForm = this.fb.group({
        item: [''],
        partNumber: ['', [Validators.required]],
        nomenclatura: ['', [Validators.required]],
        quantidade: ['', [Validators.required]],
        localizacao: [''],
        partNumberAlternativo: [''],
        aplicacao: [''],
        capitulo: [''],
        serialNumber: [''],
        doc: [''],
        status: [''],
        imagem: ['']
      });

      this.estoqueForm.patchValue({
        id: this.estoque.id,
        item: this.estoque.item,
        partNumber: this.estoque.partNumber,
        nomenclatura: this.estoque.nomenclatura,
        quantidade: this.estoque.quantidade,
        localizacao: this.estoque.localizacao,
        partNumberAlternativo: this.estoque.partNumberAlternativo,
        aplicacao: this.estoque.aplicacao,
        capitulo: this.estoque.capitulo,
        serialNumber: this.estoque.serialNumber,
        doc: this.estoque.doc,
        status: this.estoque.status
    });

      this.imagemOriginalSrc = this.imagens + this.estoque.imagem;

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarEstoque() {
        if (this.estoqueForm.dirty && this.estoqueForm.valid) {
          this.estoque = Object.assign({}, this.estoque, this.estoqueForm.value);

          if (this.imageBase64) {
            this.estoque.imagemUpload = this.imageBase64;
            this.estoque.imagem = this.imagemNome;
          }

          this.estoqueService.atualizarEstoque(this.estoque)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.estoqueForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Ítem editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/estoque/listar-todos']);
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