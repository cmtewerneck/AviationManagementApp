import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripulanteService } from '../services/tripulante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { Tripulante } from '../models/Tripulante';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { utilsBr } from 'js-brasil';
import { TripulanteBaseComponent } from '../tripulante-form.base.component';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends TripulanteBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
              private tripulanteService: TripulanteService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
      
      super();
      this.tripulante = this.route.snapshot.data['tripulante'];
    }
    
    ngOnInit(): void {

      this.spinner.show();
      
      this.tripulanteForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
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

      this.tripulanteForm.patchValue({
          id: this.tripulante.id,
          nome: this.tripulante.nome,
          cpf: this.tripulante.cpf,
          email: this.tripulante.email,
          dataNascimento: this.tripulante.dataNascimento,
          dataAdmissao: this.tripulante.dataAdmissao,
          sexo: this.tripulante.sexo,
          cargo: this.tripulante.cargo,
          salario: CurrencyUtils.DecimalParaString(this.tripulante.salario),
          situacao: this.tripulante.situacao,
          rg: this.tripulante.rg,
          orgaoEmissor: this.tripulante.orgaoEmissor,
          tituloEleitor: this.tripulante.tituloEleitor,
          numeroPis: this.tripulante.numeroPis,
          numeroCtps: this.tripulante.numeroCtps,
          numeroCnh: this.tripulante.numeroCnh,
      });

      this.imagemOriginalSrc = this.imagens + this.tripulante.imagem;

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarTripulante() {
        if (this.tripulanteForm.dirty && this.tripulanteForm.valid) {
          this.tripulante = Object.assign({}, this.tripulante, this.tripulanteForm.value);

          if (this.imageBase64) {
            this.tripulante.imagemUpload = this.imageBase64;
            this.tripulante.imagem = this.imagemNome;
          }

          this.tripulante.salario = CurrencyUtils.StringParaDecimal(this.tripulante.salario);
          this.tripulante.cpf = StringUtils.somenteNumeros(this.tripulante.cpf);

          this.tripulanteService.atualizarTripulante(this.tripulante)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.tripulanteForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Tripulante editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/tripulantes/listar-todos']);
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