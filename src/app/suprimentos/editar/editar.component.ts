import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuprimentoService } from '../services/suprimento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { SuprimentoBaseComponent } from '../suprimento-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends SuprimentoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
    private suprimentoService: SuprimentoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.suprimento = this.route.snapshot.data['suprimento'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.suprimentoForm = this.fb.group({
        codigo: ['',  Validators.maxLength(30)],
        partNumber: ['', [Validators.required, Validators.maxLength(30)]],
        nomenclatura: ['', [Validators.required, Validators.maxLength(50)]],
        quantidade: [''],
        localizacao: ['', Validators.maxLength(30)],
        partNumberAlternativo: ['', Validators.maxLength(30)],
        aplicacao: ['', Validators.maxLength(20)],
        capitulo: ['', Validators.maxLength(20)],
        serialNumber: ['', Validators.maxLength(30)],
        doc: ['', Validators.maxLength(20)],
        imagem: ['']
      });
      
      this.suprimentoForm.patchValue({
        id: this.suprimento.id,
        codigo: this.suprimento.codigo,
        partNumber: this.suprimento.partNumber,
        nomenclatura: this.suprimento.nomenclatura,
        quantidade: this.suprimento.quantidade,
        localizacao: this.suprimento.localizacao,
        partNumberAlternativo: this.suprimento.partNumberAlternativo,
        aplicacao: this.suprimento.aplicacao,
        capitulo: this.suprimento.capitulo,
        serialNumber: this.suprimento.serialNumber,
        doc: this.suprimento.doc,
      });
      
      this.imagemOriginalSrc = this.imagens + this.suprimento.imagem;
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarSuprimento() {
      if (this.suprimentoForm.dirty && this.suprimentoForm.valid) {
        this.suprimento = Object.assign({}, this.suprimento, this.suprimentoForm.value);
        
        if (this.imageBase64) {
          this.suprimento.imagemUpload = this.imageBase64;
          this.suprimento.imagem = this.imagemNome;
        }
        
        // CONVERSÕES PARA JSON
        this.suprimento.quantidade = Number(this.suprimento.quantidade);
        // FIM DAS CONVERSÕES

        console.log(this.suprimento);
        
        this.suprimentoService.atualizarSuprimento(this.suprimento)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.suprimentoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Ítem editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/suprimentos/listar-todos']);
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