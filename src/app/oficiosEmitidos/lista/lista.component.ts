import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OficioEmitido } from '../models/OficioEmitido';
import { OficioEmitidoPaged } from '../models/OficioEmitidoPaged';
import { OficioEmitidoService } from '../services/oficioEmitido.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  oficiosEmitidos: OficioEmitidoPaged[];
  errorMessage: string;
  oficioEmitido: OficioEmitidoPaged;
  oficiosEmitidosFiltrados: OficioEmitidoPaged[];

  // PAGINATION
  pageSize: number = 2;
  currentPage: number = 1;
  directionLinks: boolean = true;
  previousLabel: string = 'Anterior';
  nextLabel: string = 'Próximo';
  
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
    
    filtrarOficioEmitido(filtrarPor: string): OficioEmitidoPaged[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.oficiosEmitidos.filter(
        oficioEmitido => oficioEmitido.list.numeracao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }
      
    ObterTodos() {
      this.oficioEmitidoService.obterTodosPaginados(this.pageSize, this.currentPage, null).subscribe(
        (_oficiosEmitidos: OficioEmitidoPaged[]) => {
          this.oficiosEmitidos = _oficiosEmitidos;
          this.oficiosEmitidosFiltrados = this.oficiosEmitidos;
          console.log(this.oficiosEmitidosFiltrados);
        }, error => {
          this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
          console.log(error);
        });
      }

    // ObterTodosAntigo() {
    //   this.oficioEmitidoService.obterTodos().subscribe(
    //     (_oficiosEmitidos: OficioEmitido[]) => {
    //       this.oficiosEmitidos = _oficiosEmitidos;
    //       this.oficiosEmitidosFiltrados = this.oficiosEmitidos;
    //     }, error => {
    //       this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
    //       console.log(error);
    //     });
    //   }

    gerarPdf(oficioEmitido: OficioEmitido) {
      console.log('Gerando PDF ...');

      //var imgData = 'assets/modelo_certificado.png';
      var imgData = 'assets/modelo_certificado_2.jpg';
      //var imgData = 'assets/modelo_certificado_3.jpg';
      const doc = new jsPDF('l', 'mm', 'a4');

      doc.addImage(imgData, 'PNG', 0, 0, 297, 210);
      doc.line(40, 40, 257, 40);

      doc.setTextColor(0,106,178);
      doc.setFontSize(40);
      doc.setFont("century-gothic", "bold");
      doc.text('CERTIFICADO DE CONCLUSÃO', 40, 55);

      doc.line(40, 61, 257, 61);
      
      doc.setTextColor(0,0,0);
      doc.setFontSize(20);
      doc.setFont("century-gothic", "regular");
      doc.text('Certifico para os devidos fins, que Thiago Werneck Caldas, CPF 123.456.789-10, concluiu com êxito o curso de Piloto Privado de Avião nesta entidade, no período de 10/01/2021 à 12/01/2021, com carga horária de 360 horas.', 40, 80, {maxWidth: 217, align: "justify"});

      doc.setFontSize(14);
      doc.text('Rio, 12 de Janeiro de 2021', 40, 140);
      
      doc.line(40, 170, 100, 170); // ASSINATURA DIRETOR
      doc.line(197, 170, 257, 170); // ASSINATURA ALUNO

      doc.setTextColor(0,0,0);
      doc.setFontSize(12);
      doc.setFont("century-gothic", "regular");
      doc.text('DIRETOR', 60, 176);

      doc.setTextColor(0,0,0);
      doc.setFontSize(12);
      doc.setFont("century-gothic", "regular");
      doc.text('ALUNO', 220, 176);



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

    pageChange(number: number) {
      console.log(`pageChange(${number})`);
      this.currentPage = number;
      this.ObterTodos();
    }

}