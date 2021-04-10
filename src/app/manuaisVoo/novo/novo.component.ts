import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManualVooService } from '../services/manualVoo.service';
import { ManualVooBaseComponent } from '../manualVoo-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ManualVooBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  arquivoNome: string;
  arquivoChangedEvent: any = '';
  base64textString: any = '';

  constructor(private fb: FormBuilder,
    private manualVooService: ManualVooService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
      this.manualVooForm = this.fb.group({
        modeloAeronave: ['', [Validators.required, Validators.maxLength(20)]],
        ultimaRevisao: [''],
        arquivo: ['']
      });
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    adicionarManualVoo() {
      if (this.manualVooForm.dirty && this.manualVooForm.valid) {
        this.manualVoo = Object.assign({}, this.manualVoo, this.manualVooForm.value);
        
        //this.manualVoo.arquivoUpload = this.base64textString.split(',')[1]; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.manualVoo.arquivoUpload = this.base64textString; // TIRAR O HEADER DA IMAGEM EM BASE 64
        this.manualVoo.arquivo = this.arquivoNome;

        // CONVERSÕES PARA JSON
        if (this.manualVoo.ultimaRevisao) { this.manualVoo.ultimaRevisao = new Date(this.manualVoo.ultimaRevisao); } else { this.manualVoo.ultimaRevisao = null; }
        // FIM DAS CONVERSÕES

        console.log(this.manualVoo);
        
        this.manualVooService.novoManualVoo(this.manualVoo)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.manualVooForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Manual cadastrado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/manuais-voo/listar-todos']);
          });
        }
      }
      
      processarFalha(fail: any) {
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Opa...');
      }

      // UPLOAD ---------------------------------------------
      // fileChangeEvent(event: any): void {
      //   //this.arquivoChangedEvent = event.base64;

      //   const file = event.target.files[0];
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);

      //   reader.onload = () => {
      //     console.log(reader.result);
      //   };

      //   this.arquivoNome = event.currentTarget.files[0].name;
      // }

      fileChangeEvent(event: any): void{
        var files = event.target.files;
        var file = files[0];
        this.arquivoNome = file.name;

      if (files && file) {
          var reader = new FileReader();
  
          reader.onload = this.handleFile.bind(this);
  
          reader.readAsBinaryString(file);
      }
    }
  
    handleFile(event) {
       var binaryString = event.target.result;
              this.base64textString = btoa(binaryString);
              console.log(btoa(binaryString));
      }

}  