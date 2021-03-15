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
        fabricante: ['', [Validators.required,Validators.maxLength(50)]],
        categoria: ['', [Validators.required, Validators.maxLength(20)]],
        modelo: ['', [Validators.required, Validators.maxLength(30)]],
        numeroSerie: ['', Validators.maxLength(20)],
        ano: [''],
        pesoVazio: [''],
        pesoBasico: [''],
        horasTotais: [''],
        horasRestantes: [''],
        tipoAeronave: ['', Validators.required],
        vencimentoCA: [''],
        vencimentoCVA: [''],
        vencimentoCM: [''],
        ultimaPesagem: [''],
        proximaPesagem: [''],
        vencimentoReta: [''],
        vencimentoCasco: [''],
        motor: ['', Validators.maxLength(30)],
        modeloMotor: ['', Validators.maxLength(30)],
        numeroSerieMotor: ['', Validators.maxLength(30)],
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
        pesoVazio: CurrencyUtils.DecimalParaString(this.aeronave.pesoVazio),
        pesoBasico: CurrencyUtils.DecimalParaString(this.aeronave.pesoBasico),
        horasTotais: CurrencyUtils.DecimalParaString(this.aeronave.horasTotais),
        horasRestantes: CurrencyUtils.DecimalParaString(this.aeronave.horasRestantes),
        tipoAeronave: this.aeronave.tipoAeronave,
        vencimentoCA: this.aeronave.vencimentoCA,
        vencimentoCVA: this.aeronave.vencimentoCVA,
        vencimentoCM: this.aeronave.vencimentoCM,
        ultimaPesagem: this.aeronave.ultimaPesagem,
        proximaPesagem: this.aeronave.proximaPesagem,
        vencimentoReta: this.aeronave.vencimentoReta,
        vencimentoCasco: this.aeronave.vencimentoCasco,
        motor: this.aeronave.motor,
        modeloMotor: this.aeronave.modeloMotor,
        numeroSerieMotor: this.aeronave.numeroSerieMotor
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
        
        // CONVERSÕES DE JSON
        if (this.aeronave.ano) { this.aeronave.ano = Number(this.aeronave.ano); } else { this.aeronave.ano = null; }
        this.aeronave.pesoVazio = CurrencyUtils.StringParaDecimal(this.aeronave.pesoVazio);
        this.aeronave.pesoBasico = CurrencyUtils.StringParaDecimal(this.aeronave.pesoBasico);
        this.aeronave.horasTotais = CurrencyUtils.StringParaDecimal(this.aeronave.horasTotais);
        this.aeronave.horasRestantes = CurrencyUtils.StringParaDecimal(this.aeronave.horasRestantes);
        if (this.aeronave.vencimentoCA) { this.aeronave.vencimentoCA = new Date(this.aeronave.vencimentoCA); } else { this.aeronave.vencimentoCA = null; }
        if (this.aeronave.vencimentoCVA) { this.aeronave.vencimentoCVA = new Date(this.aeronave.vencimentoCVA); } else { this.aeronave.vencimentoCVA = null; }
        if (this.aeronave.vencimentoCM) { this.aeronave.vencimentoCM = new Date(this.aeronave.vencimentoCM); } else { this.aeronave.vencimentoCM = null; }
        if (this.aeronave.ultimaPesagem) { this.aeronave.ultimaPesagem = new Date(this.aeronave.ultimaPesagem); } else { this.aeronave.ultimaPesagem = null; }
        if (this.aeronave.proximaPesagem) { this.aeronave.proximaPesagem = new Date(this.aeronave.proximaPesagem); } else { this.aeronave.proximaPesagem = null; }
        if (this.aeronave.vencimentoReta) { this.aeronave.vencimentoReta = new Date(this.aeronave.vencimentoReta); } else { this.aeronave.vencimentoReta = null; }
        if (this.aeronave.vencimentoCasco) { this.aeronave.vencimentoCasco = new Date(this.aeronave.vencimentoCasco); } else { this.aeronave.vencimentoCasco = null; }
        // FIM DAS CONVERSÕES

        console.log(this.aeronave);
        
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