import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdemServico } from '../models/OrdemServico';
import { OrdemServicoService } from '../services/ordemServico.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public ordensServico: OrdemServico[];
  errorMessage: string;
  
  ordemServico: OrdemServico;
  ordensServicoFiltrados: OrdemServico[];
  
  constructor(private ordemServicoService: OrdemServicoService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.ObterTodos();
    }
    
    _filtroLista: string;
    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.ordensServicoFiltrados = this.filtroLista ? this.filtrarOrdemServico(this.filtroLista) : this.ordensServico;
    }
    
    filtrarOrdemServico(filtrarPor: string): OrdemServico[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.ordensServico.filter(
        ordemServico => ordemServico.numeroOrdem.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.ordemServicoService.obterTodos().subscribe(
          (_ordensServico: OrdemServico[]) => {
            this.ordensServico = _ordensServico;
            this.ordensServicoFiltrados = this.ordensServico;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }
        
        gerarPdf(ordemServico: OrdemServico) {
          console.log('Gerando PDF ...');
          const doc = new jsPDF();
          
          doc.text('Ordem de Serviço Nº: ' + ordemServico.numeroOrdem, 15, 20);
          doc.text('Data de Abertura: ' + ordemServico.dataAbertura, 15, 30);
          doc.text('Matrícula: ' + ordemServico.matriculaAeronave, 15, 40);
          //doc.text('Modelo: ' + ordemServico.aeronaveModelo, 15, 50);
          //doc.text('Nº de Série: ' + ordemServico.aeronaveNumeroSerie, 15, 60);
          doc.text('TTSN: ' + ordemServico.ttsn, 15, 70);
          doc.text('TCSN Pousos: ' + ordemServico.tcsnPousos, 15, 80);
          doc.text('Serviços: ' + ordemServico.tcsnPousos, 15, 90);
          
          var inicial = 90;
          for (let servico of ordemServico.itens){
            doc.text(servico.titulo, 15, inicial);
            inicial += 10;
          }

          // FOOTER
          const pageCount = doc.getNumberOfPages();
          
          for (let i = 1; i <= pageCount; i++) {
            // Go to page i
            doc.setPage(i);
            // Print Page 1 of 4 for example
            doc.text('Página ' + String(i) + ' de ' + String(pageCount), 210 - 20, 297 - 20, null, 'right');
          }
          
          doc.save('Ordem de Serviço - ' + ordemServico.numeroOrdem + '.pdf');
        }
      }