import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VeiculoService } from '../services/veiculo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { VeiculoBaseComponent } from '../veiculo-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends VeiculoBaseComponent implements OnInit {
  
  imagens: string = environment.imagensUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.veiculo = this.route.snapshot.data['veiculo'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.veiculoForm = this.fb.group({
        placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
        ufPlaca: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        ano: [''],
        proprio: ['', Validators.required],
        kmAtual: [''],
        modelo: ['', [Validators.required, Validators.maxLength(30)]],
        renavam: ['', [Validators.required, Validators.maxLength(30)]],
        tipoCombustivel: [''],
        imagem: ['']
      });
      
      this.veiculoForm.patchValue({
        id: this.veiculo.id,
        placa: this.veiculo.placa,
        ufPlaca: this.veiculo.ufPlaca,
        ano: this.veiculo.ano,
        proprio: this.veiculo.proprio,
        kmAtual: this.veiculo.kmAtual,
        modelo: this.veiculo.modelo,
        renavam: this.veiculo.renavam,
        tipoCombustivel: this.veiculo.tipoCombustivel
      });
      
      this.imagemOriginalSrc = this.imagens + this.veiculo.imagem;
      
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
    
    ngAfterViewInit(): void {
      super.configurarValidacaoFormulario(this.formInputElements);
    }
    
    editarVeiculo() {
      if (this.veiculoForm.dirty && this.veiculoForm.valid) {
        this.veiculo = Object.assign({}, this.veiculo, this.veiculoForm.value);
        
        if (this.imageBase64) {
          this.veiculo.imagemUpload = this.imageBase64;
          this.veiculo.imagem = this.imagemNome;
        }
        
        this.veiculoService.atualizarVeiculo(this.veiculo)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
          );
          
          this.mudancasNaoSalvas = false;
        }
      }
      
      processarSucesso(response: any) {
        this.veiculoForm.reset();
        this.errors = [];
        
        let toast = this.toastr.success('Veículo editado com sucesso!', 'Sucesso!');
        if (toast) {
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/veiculos/listar-todos']);
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