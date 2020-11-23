import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MecanicoService } from '../services/mecanico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Mecanico } from '../models/Mecanico';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { MecanicoBaseComponent } from '../mecanico-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends MecanicoBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
              private mecanicoService: MecanicoService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
      
      super();
      this.mecanico = this.route.snapshot.data['mecanico'];
    }
    
    ngOnInit(): void {

      this.spinner.show();
      
      this.mecanicoForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        canac: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
        email: ['', [Validators.email]],
        dataNascimento: [''],
        dataAdmissao: [''],
        sexo: [''],
        cargo: ['', [Validators.required]],
        estadoCivil: [''],
        salario: [''],
        situacao: [''],
        rg: [''],
        orgaoEmissor: [''],
        tituloEleitor: [''],
        numeroPis: [''],
        numeroCtps: [''],
        numeroCnh: [''],
        imagem: [''],
        });

      this.mecanicoForm.patchValue({
          id: this.mecanico.id,
          nome: this.mecanico.nome,
          canac: this.mecanico.canac,
          cpf: this.mecanico.cpf,
          email: this.mecanico.email,
          dataNascimento: this.mecanico.dataNascimento,
          dataAdmissao: this.mecanico.dataAdmissao,
          sexo: this.mecanico.sexo,
          cargo: this.mecanico.cargo,
          salario: CurrencyUtils.DecimalParaString(this.mecanico.salario),
          situacao: this.mecanico.situacao,
          rg: this.mecanico.rg,
          orgaoEmissor: this.mecanico.orgaoEmissor,
          tituloEleitor: this.mecanico.tituloEleitor,
          numeroPis: this.mecanico.numeroPis,
          numeroCtps: this.mecanico.numeroCtps,
          numeroCnh: this.mecanico.numeroCnh,
      });

      this.imagemOriginalSrc = this.imagens + this.mecanico.imagem;

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarMecanico() {
        if (this.mecanicoForm.dirty && this.mecanicoForm.valid) {
          this.mecanico = Object.assign({}, this.mecanico, this.mecanicoForm.value);

          if (this.imageBase64) {
            this.mecanico.imagemUpload = this.imageBase64;
            this.mecanico.imagem = this.imagemNome;
          }

          this.mecanico.salario = CurrencyUtils.StringParaDecimal(this.mecanico.salario);
          this.mecanico.cpf = StringUtils.somenteNumeros(this.mecanico.cpf);

          this.mecanicoService.atualizarMecanico(this.mecanico)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.mecanicoForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Mecânico editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/mecanicos/listar-todos']);
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