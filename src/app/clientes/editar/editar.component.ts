import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteBaseComponent } from '../cliente-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { environment } from 'src/environments/environment';
import { utilsBr } from 'js-brasil';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ClienteBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  textoDocumento: string = '';
  MASKS = utilsBr.MASKS;
  
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.cliente = this.route.snapshot.data['cliente'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.clienteForm = this.fb.group({
        // PESSOA 
        nome: ['', [Validators.required, Validators.maxLength(100)]],
        tipoPessoa: ['', Validators.required],
        documento: ['', [Validators.required, NgBrazilValidators.cpf]],
        sexo: ['', Validators.required],
        estadoCivil: ['', Validators.maxLength(20)],
        ativo: [0],
        telefone: ['', Validators.maxLength(20)],
        email: ['', [Validators.email, Validators.maxLength(20)]],
        imagem: ['']
      });
      
      this.clienteForm.patchValue({
        id: this.cliente.id,
        nome: this.cliente.nome,
        tipoPessoa: this.cliente.tipoPessoa,
        documento: this.cliente.documento,
        sexo: this.cliente.sexo,
        estadoCivil: this.cliente.estadoCivil,
        ativo: this.cliente.ativo,
        telefone: this.cliente.telefone,
        email: this.cliente.email
      });
      
      if (this.tipoClienteForm().value === '1') {
        this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      }
      else {
        this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      }
      
      this.imagemOriginalSrc = this.imagens + this.cliente.imagem;
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit() {
      this.tipoClienteForm().valueChanges.subscribe(() => {
        this.trocarValidacaoDocumento();
      });
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    trocarValidacaoDocumento() {
      
      if (this.tipoClienteForm().value === '1') {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
      }
      
      else {
        this.documento().clearValidators();
        this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      }
    }
    
    documento(): AbstractControl {
      return this.clienteForm.get('documento');
    }
    
    tipoClienteForm(): AbstractControl {
      return this.clienteForm.get('tipoPessoa');
    }
    
    editarCliente() {
      if (this.clienteForm.dirty && this.clienteForm.valid) {
        this.cliente = Object.assign({}, this.cliente, this.clienteForm.value);

        if (this.imageBase64) {
          this.cliente.imagemUpload = this.imageBase64;
          this.cliente.imagem = this.imagemNome;
        }

        this.cliente.documento = StringUtils.somenteNumeros(this.cliente.documento);
        
        this.clienteService.EditarCliente(this.cliente)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.clienteForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Cliente editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/clientes/listar-todos']);
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