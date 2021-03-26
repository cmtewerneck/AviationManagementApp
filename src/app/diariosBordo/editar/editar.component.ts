import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiarioBordoService } from '../services/diarioBordo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiarioBordoBaseComponent } from '../diarioBordo-form.base.component';
import { CurrencyUtils } from 'src/app/utils/currency-utils';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends DiarioBordoBaseComponent implements OnInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  constructor(private fb: FormBuilder,
    private diarioBordoService: DiarioBordoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
      
      super();
      this.diarioBordo = this.route.snapshot.data['diarioBordo'];
    }
    
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.diarioBordoService.obterAeronaves()
      .subscribe(
        aeronaves => this.aeronaves = aeronaves);
        
        this.diarioBordoForm = this.fb.group({
          data: ['', [Validators.required]],
            base: ['', [Validators.required, Validators.maxLength(20)]],
            de: ['', [Validators.required, Validators.maxLength(4)]],
            para: ['', [Validators.required, Validators.maxLength(4)]],
            horaAcionamento: ['', [Validators.required]],
            horaDecolagem: [''],
            horaPouso: [''],
            horaCorte: ['', [Validators.required]],
            totalDiurno: [''],
            totalNoturno: [''],
            totalIfr: [''],
            totalNavegacao: [''],
            totalDecimal: ['', [Validators.required]],
            totalDecPouso: [''],
            totalAcionamentoCorte: ['', [Validators.required]],
            pousos: ['', [Validators.required]],
            pob: ['', [Validators.required]],
            combustivelDecolagem: ['', [Validators.required]],
            naturezaVoo: ['', Validators.required],
            preVooResponsavel: ['', [Validators.required, Validators.maxLength(20)]],
            posVooResponsavel: ['', [Validators.required, Validators.maxLength(20)]],
            observacoes: ['', Validators.maxLength(300)],
            discrepancias: ['', Validators.maxLength(300)],
            acoesCorretivas: ['', Validators.maxLength(300)],
            aeronaveId: ['', [Validators.required]],
            comandanteId: ['', [Validators.required]],
            copilotoId: [''],
            mecanicoResponsavelId: ['', [Validators.required]]
        });
        
        this.diarioBordoForm.patchValue({
          id: this.diarioBordo.id,
          data: this.diarioBordo.data,
          base: this.diarioBordo.base,
          de: this.diarioBordo.de,
          para: this.diarioBordo.para,
          horaAcionamento: this.diarioBordo.horaAcionamento,
          horaDecolagem: this.diarioBordo.horaDecolagem,
          horaPouso: this.diarioBordo.horaPouso,
          horaCorte: this.diarioBordo.horaCorte,
          totalDiurno: this.diarioBordo.totalDiurno,
          totalNoturno: this.diarioBordo.totalNoturno,
          totalNavegacao: this.diarioBordo.totalNavegacao,
          totalIfr: this.diarioBordo.totalIfr,
          totalDecimal: CurrencyUtils.DecimalParaString(this.diarioBordo.totalDecimal),
          totalDecPouso: CurrencyUtils.DecimalParaString(this.diarioBordo.totalDecPouso),
          totalAcionamentoCorte: CurrencyUtils.DecimalParaString(this.diarioBordo.totalAcionamentoCorte),
          pousos: this.diarioBordo.pousos,
          pob: this.diarioBordo.pob,
          combustivelDecolagem: this.diarioBordo.combustivelDecolagem,
          naturezaVoo: this.diarioBordo.naturezaVoo,
          preVooResponsavel: this.diarioBordo.preVooResponsavel,
          posVooResponsavel: this.diarioBordo.posVooResponsavel,
          observacoes: this.diarioBordo.observacoes,
          discrepancias: this.diarioBordo.discrepancias,
          acoesCorretivas: this.diarioBordo.acoesCorretivas,
          aeronaveId: this.diarioBordo.aeronaveId,
          comandanteId: this.diarioBordo.comandanteId,
          copilotoId: this.diarioBordo.copilotoId,
          mecanicoResponsavelId: this.diarioBordo.mecanicoResponsavelId
        });
        
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      }
      
      ngAfterViewInit(): void {
        super.configurarValidacaoFormulario(this.formInputElements);
      }
      
      editarDiarioBordo() {
        if (this.diarioBordoForm.dirty && this.diarioBordoForm.valid) {
          this.diarioBordo = Object.assign({}, this.diarioBordo, this.diarioBordoForm.value);
          
          // CONVERSÕES DE JSON
          this.diarioBordo.data = new Date(this.diarioBordo.data);
          this.diarioBordo.horaAcionamento = new Date(this.diarioBordo.horaAcionamento);
          if (this.diarioBordo.horaDecolagem) { this.diarioBordo.horaDecolagem = new Date(this.diarioBordo.horaDecolagem); } else { this.diarioBordo.horaDecolagem = null; }
          if (this.diarioBordo.horaPouso) { this.diarioBordo.horaPouso = new Date(this.diarioBordo.horaPouso); } else { this.diarioBordo.horaPouso = null; }
          this.diarioBordo.horaCorte = new Date(this.diarioBordo.horaCorte);
          if (this.diarioBordo.totalDiurno) { this.diarioBordo.totalDiurno = new Date(this.diarioBordo.totalDiurno); } else { this.diarioBordo.totalDiurno = null; }
          if (this.diarioBordo.totalNoturno) { this.diarioBordo.totalNoturno = new Date(this.diarioBordo.totalNoturno); } else { this.diarioBordo.totalNoturno = null; }
          if (this.diarioBordo.totalIfr) { this.diarioBordo.totalIfr = new Date(this.diarioBordo.totalIfr); } else { this.diarioBordo.totalIfr = null; }
          if (this.diarioBordo.totalNavegacao) { this.diarioBordo.totalNavegacao = new Date(this.diarioBordo.totalNavegacao); } else { this.diarioBordo.totalNavegacao = null; }
          this.diarioBordo.totalDecimal = CurrencyUtils.StringParaDecimal(this.diarioBordo.totalDecimal);
          this.diarioBordo.totalDecPouso = CurrencyUtils.StringParaDecimal(this.diarioBordo.totalDecPouso);
          this.diarioBordo.totalAcionamentoCorte = CurrencyUtils.StringParaDecimal(this.diarioBordo.totalAcionamentoCorte);
          this.diarioBordo.pousos = Number(this.diarioBordo.pousos);
          this.diarioBordo.pob = Number(this.diarioBordo.pob);
          this.diarioBordo.combustivelDecolagem = Number(this.diarioBordo.combustivelDecolagem);
          this.diarioBordo.naturezaVoo = Number(this.diarioBordo.naturezaVoo);
          // FIM DAS CONVERSÕES

          console.log(this.diarioBordo);
            
          this.diarioBordoService.atualizarDiarioBordo(this.diarioBordo)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
            );
            
            this.mudancasNaoSalvas = false;
          }
        }
        
        processarSucesso(response: any) {
          this.diarioBordoForm.reset();
          this.errors = [];
          
          let toast = this.toastr.success('Diário editado com sucesso!', 'Sucesso!');
          if (toast) {
            toast.onHidden.subscribe(() => {
              this.router.navigate(['/diarios-bordo/listar-todos']);
            });
          }
        }
        
        processarFalha(fail: any) {
          this.errors = fail.error.errors;
          this.toastr.error('Ocorreu um erro!', 'Opa :(');
        }
      }