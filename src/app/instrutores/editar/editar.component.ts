import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstrutorService } from '../services/instrutor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Instrutor } from '../models/Instrutor';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { InstrutorBaseComponent } from '../instrutor-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends InstrutorBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
              private instrutorService: InstrutorService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
      
      super();
      this.instrutor = this.route.snapshot.data['instrutor'];
    }
    
    ngOnInit(): void {

      this.spinner.show();
      
      this.instrutorForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
        rg: ['', [Validators.required, Validators.maxLength(15)]],
        email: ['', [Validators.email]],
        telefone: ['', [Validators.required, Validators.maxLength(20)]],
        canac: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        dataNascimento: [''],
        dataAdmissao: [''],
        sexo: [''],
        estadoCivil: [''],
        salario: [''],
        imagem: ['', [Validators.required]],
      });

      this.instrutorForm.patchValue({
          id: this.instrutor.id,
          nome: this.instrutor.nome,
          cpf: this.instrutor.cpf,
          rg: this.instrutor.rg,
          email: this.instrutor.email,
          telefone: this.instrutor.telefone,
          canac: this.instrutor.canac,
          dataNascimento: this.instrutor.dataNascimento,
          dataAdmissao: this.instrutor.dataAdmissao,
          sexo: this.instrutor.sexo,
          estadoCivil: this.instrutor.estadoCivil,
          salario: CurrencyUtils.DecimalParaString(this.instrutor.salario),
      });

      this.imagemOriginalSrc = this.imagens + this.instrutor.imagem;

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarInstrutor() {
        if (this.instrutorForm.dirty && this.instrutorForm.valid) {
          this.instrutor = Object.assign({}, this.instrutor, this.instrutorForm.value);

          if (this.imageBase64) {
            this.instrutor.imagemUpload = this.imageBase64;
            this.instrutor.imagem = this.imagemNome;
          }

          this.instrutor.salario = CurrencyUtils.StringParaDecimal(this.instrutor.salario);
          this.instrutor.cpf = StringUtils.somenteNumeros(this.instrutor.cpf);

          this.instrutorService.atualizarInstrutor(this.instrutor)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.instrutorForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Instrutor editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/instrutores/listar-todos']);
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