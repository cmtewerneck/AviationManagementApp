import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AeronaveDiretrizService } from '../services/aeronaveDiretriz.service';
import { AeronaveDiretrizBaseComponent } from '../aeronaveDiretriz-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends AeronaveDiretrizBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private aeronaveDiretrizService: AeronaveDiretrizService,
    private router: Router,
    private toastr: ToastrService) {super(); }
    
    ngOnInit(): void {
      
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
          status: [false],
          aeronaveId: ['', [Validators.required]]
        });
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      adicionarAeronaveDiretriz() {
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

          this.aeronaveDiretrizService.novaAeronaveDiretriz(this.aeronaveDiretriz)
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
          
          let toast = this.toastr.success('Diretriz adicionado com sucesso!', 'Sucesso!');
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
      
      