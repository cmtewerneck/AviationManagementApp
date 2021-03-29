import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OficioEmitido } from '../models/oficioEmitido';
import { OficioEmitidoService } from '../services/oficioEmitido.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  public oficiosEmitidos: OficioEmitido[];
  errorMessage: string;
  
  oficioEmitido: OficioEmitido;
  oficiosEmitidosFiltrados: OficioEmitido[];
  
  constructor(private oficioEmitidoService: OficioEmitidoService,
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
      this.oficiosEmitidosFiltrados = this.filtroLista ? this.filtrarOficioEmitido(this.filtroLista) : this.oficiosEmitidos;
    }
    
    filtrarOficioEmitido(filtrarPor: string): OficioEmitido[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.oficiosEmitidos.filter(
        oficioEmitido => oficioEmitido.numeracao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
      ObterTodos() {
        this.oficioEmitidoService.obterTodos().subscribe(
          (_oficiosEmitidos: OficioEmitido[]) => {
            this.oficiosEmitidos = _oficiosEmitidos;
            this.oficiosEmitidosFiltrados = this.oficiosEmitidos;
          }, error => {
            this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
            console.log(error);
          });
        }

        gerarPdf(oficioEmitido: OficioEmitido) {
          console.log('Gerando PDF ...');

          var imgData = 'assets/modelo_certificado.png';
          const doc = new jsPDF('l', 'mm', 'a4');

          doc.text('Mensagem: ' + oficioEmitido.mensagem, 15, 120);
          doc.addImage(imgData, 'PNG', 0, 0, 297, 210);
          
          // FOOTER
          const pageCount = doc.getNumberOfPages();
          
          for (let i = 1; i <= pageCount; i++) {
            // Go to page i
            doc.setPage(i);
            // Print Page 1 of 4 for example
            doc.text('Página ' + String(i) + ' de ' + String(pageCount), 210 - 20, 297 - 20, null, "right");
          }
          
          doc.save('Ofício - ' + oficioEmitido.numeracao + '.pdf');
        }
      }