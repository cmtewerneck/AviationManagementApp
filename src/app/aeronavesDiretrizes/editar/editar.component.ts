import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDiretrizService } from '../services/aeronaveDiretriz.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AeronaveDiretrizBaseComponent } from '../aeronaveDiretriz-form.base.component';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends AeronaveDiretrizBaseComponent implements OnInit {
  
  arquivos: string = environment.filesUrl;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  arquivoNome: string;
  arquivoOriginalSrc: string;
  
  constructor(private fb: FormBuilder,
    private aeronaveDiretrizService: AeronaveDiretrizService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.aeronaveDiretriz = this.route.snapshot.data['aeronaveDiretriz'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.aeronaveDiretrizService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.aeronaveDiretrizForm = this.fb.group({
          titulo: ['', [Validators.required, Validators.maxLength(100)]],
          referencia: ['', [Validators.required, Validators.maxLength(100)]],
          dataEfetivacao: ['', Validators.required],
          descricao: ['', Validators.maxLength(500)],
          tipoDiretriz: ['', Validators.required],
          intervaloHoras: [''],
          intervaloCiclos: [''],
          intervaloDias: [''],
          ultimoCumprimentoHoras: [''],
          ultimoCumprimentoCiclos: [''],
          ultimoCumprimentoData: [''],
          observacoes: ['', Validators.maxLength(500)],
          status: [0, Validators.required],
          aeronaveId: ['', [Validators.required]]
        });
        
        this.aeronaveDiretrizForm.patchValue({
          id: this.aeronaveDiretriz.id,
          titulo: this.aeronaveDiretriz.titulo,
          referencia: this.aeronaveDiretriz.referencia,
          dataEfetivacao: this.aeronaveDiretriz.dataEfetivacao,
          descricao: this.aeronaveDiretriz.descricao,
          tipoDiretriz: this.aeronaveDiretriz.tipoDiretriz,
          intervaloHoras: CurrencyUtils.DecimalParaString(this.aeronaveDiretriz.intervaloHoras),
          intervaloCiclos: CurrencyUtils.DecimalParaString(this.aeronaveDiretriz.intervaloCiclos),
          intervaloDias: CurrencyUtils.DecimalParaString(this.aeronaveDiretriz.intervaloDias),
          ultimoCumprimentoHoras: CurrencyUtils.DecimalParaString(this.aeronaveDiretriz.ultimoCumprimentoHoras),
          ultimoCumprimentoCiclos: CurrencyUtils.DecimalParaString(this.aeronaveDiretriz.ultimoCumprimentoCiclos),
          ultimoCumprimentoData: this.aeronaveDiretriz.ultimoCumprimentoData,
          observacoes: this.aeronaveDiretriz.observacoes,
          status: this.aeronaveDiretriz.status,
          aeronaveId: this.aeronaveDiretriz.aeronaveId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarAeronaveDiretriz() {
        if (this.aeronaveDiretrizForm.dirty && this.aeronaveDiretrizForm.valid) {
          this.aeronaveDiretriz = Object.assign({}, this.aeronaveDiretriz, this.aeronaveDiretrizForm.value);
          
          // CONVERSÕES PARA JSON
          this.aeronaveDiretriz.dataEfetivacao = new Date(this.aeronaveDiretriz.dataEfetivacao);
          this.aeronaveDiretriz.tipoDiretriz = Number(this.aeronaveDiretriz.tipoDiretriz);
          this.aeronaveDiretriz.intervaloHoras = CurrencyUtils.StringParaDecimal(this.aeronaveDiretriz.intervaloHoras);
          this.aeronaveDiretriz.intervaloCiclos = CurrencyUtils.StringParaDecimal(this.aeronaveDiretriz.intervaloCiclos);
          this.aeronaveDiretriz.intervaloDias = CurrencyUtils.StringParaDecimal(this.aeronaveDiretriz.intervaloDias);
          this.aeronaveDiretriz.ultimoCumprimentoCiclos = CurrencyUtils.StringParaDecimal(this.aeronaveDiretriz.ultimoCumprimentoCiclos);
          this.aeronaveDiretriz.ultimoCumprimentoHoras = CurrencyUtils.StringParaDecimal(this.aeronaveDiretriz.ultimoCumprimentoHoras);
          if (this.aeronaveDiretriz.ultimoCumprimentoData) { this.aeronaveDiretriz.ultimoCumprimentoData = new Date(this.aeronaveDiretriz.ultimoCumprimentoData); } else { this.aeronaveDiretriz.ultimoCumprimentoData = null; }
          this.aeronaveDiretriz.status = this.aeronaveDiretriz.status.toString() == "true";
          // FIM DAS CONVERSÕES
          
          console.log(this.aeronaveDiretriz);
          
          this.aeronaveDiretrizService.atualizarAeronaveDiretriz(this.aeronaveDiretriz)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.aeronaveDiretrizForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Diretriz editada com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/aeronaves-diretrizes/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }