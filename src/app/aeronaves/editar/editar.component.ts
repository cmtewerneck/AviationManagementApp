import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveService } from '../services/aeronave.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { AeronaveBaseComponent } from '../aeronave-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AeronaveBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
              private aeronaveService: AeronaveService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

      super();
      this.aeronave = this.route.snapshot.data['aeronave'];
    }
    
    ngOnInit(): void {

      this.spinner.show();

      this.aeronaveForm = this.fb.group({
        matricula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        fabricante: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        categoria: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        modelo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        numeroSerie: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        ano: [''],
        pesoVazio: [''],
        horasTotais: [''],
        horasRestantes: [''],
        vencimentoCa: [''],
        vencimentoCm: [''],
        ultimaPesagem: [''],
        vencimentoReta: [''],
        imagem: ['']
        });

      this.aeronaveForm.patchValue({
        id: this.aeronave.id,
        matricula: this.aeronave.matricula,
        fabricante: this.aeronave.fabricante,
        categoria: this.aeronave.categoria,
        modelo: this.aeronave.modelo,
        numeroSerie: this.aeronave.numeroSerie,
        ano: this.aeronave.ano,
        pesoVazio: this.aeronave.pesoVazio,
        horasTotais: this.aeronave.horasTotais,
        horasRestantes: this.aeronave.horasRestantes,
        vencimentoCa: this.aeronave.vencimentoCa,
        vencimentoCm: this.aeronave.vencimentoCm,
        ultimaPesagem: this.aeronave.ultimaPesagem,
        vencimentoReta: this.aeronave.vencimentoReta
      });

      this.imagemOriginalSrc = this.imagens + this.aeronave.imagem;

      setTimeout(() => {
          this.spinner.hide();
        }, 1000);
    }

      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }

      editarAeronave() {
        if (this.aeronaveForm.dirty && this.aeronaveForm.valid) {
          this.aeronave = Object.assign({}, this.aeronave, this.aeronaveForm.value);

          if (this.imageBase64) {
            this.aeronave.imagemUpload = this.imageBase64;
            this.aeronave.imagem = this.imagemNome;
          }

          this.aeronaveService.atualizarAeronave(this.aeronave)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );

          this.mudancasNaoSalvas = false;
          }
        }

        processarSucesso(response: any) {
          this.aeronaveForm.reset();
          this.errors = [];

          let toast = this.toastr.success('Aeronave editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/aeronaves/listar-todos']);
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