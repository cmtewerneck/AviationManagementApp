import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Treinamento } from '../models/Treinamento';
import { TreinamentoService } from '../services/treinamento.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public treinamentos: Treinamento[];
  errors: any[] = [];
  errorMessage: string;

  treinamento: Treinamento;
  treinamentosFiltrados: Treinamento[];
  treinamentoId: string;

  constructor(private treinamentoService: TreinamentoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  openModal(template: any, id: string) {
    template.show();
    this.treinamentoId = id;
    console.log(this.treinamentoId);
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.treinamentosFiltrados = this.filtroLista ? this.filtrarTreinamento(this.filtroLista) : this.treinamentos;
  }

  filtrarTreinamento(filtrarPor: string): Treinamento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.treinamentos.filter(
      treinamento => treinamento.nomeTripulante.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.treinamentoService.obterTodos().subscribe(
      (_treinamentos: Treinamento[]) => {
      this.treinamentos = _treinamentos;
      this.treinamentosFiltrados = this.treinamentos;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }

  encerrarTreinamento(template: any) {
    console.log("ID sendo enviado: " + this.treinamentoId);
    this.treinamentoService.encerrarTreinamento(this.treinamentoId)
    .subscribe(
      treinamento => {
        // const index = this.treinamentos.findIndex(x => x.id == this.treinamentoId);
        // this.treinamentos = this.treinamentos.splice(index, 1, treinamento);
        this.sucessoExclusao(treinamento);
      },
      error => { this.falha(error) }
    )
    template.hide();
  }

  reabrirTreinamento(template: any) {
    console.log("ID sendo enviado: " + this.treinamentoId);
    this.treinamentoService.reabrirTreinamento(this.treinamentoId)
    .subscribe(
      treinamento => {
        // const index = this.treinamentos.findIndex(x => x.id == this.treinamentoId);
        // this.treinamentos = this.treinamentos.splice(index, 1, treinamento);
        this.sucessoReabertura(treinamento);
      },
      error => { this.falha(error) }
    )
    template.hide();
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Não foi possível a exclusão.', 'Ops! :(');
  }

  sucessoExclusao(evento: any) {
    this.toastr.success('Treinamento encerrado!', 'Sucesso!');
    this.treinamentoId = "";
    this.ObterTodos();
  }

  sucessoReabertura(evento: any) {
    this.toastr.success('Treinamento reaberto!', 'Sucesso!');
    this.treinamentoId = "";
    this.ObterTodos();
  }

  gerarPdf(treinamento: Treinamento) {
    console.log('Gerando PDF ...');

    // PEGANDO O TIPO DO TREINAMENTO (INICIAL OU PERIÓDICO) ----------------------------------------------------------------
    if(treinamento.classificacaoTreinamento == 1){
      var classificacao = 'Inicial';
    }
    else if(treinamento.classificacaoTreinamento == 2){
      var classificacao = 'Periódico';
    }

    // PEGANDO A DATA INICIAL COMPLETA PRO PERÍODO ----------------------------------------------------------------
    var diaInicio = new Date(treinamento.dataInicio);
    var dataInicioDia = diaInicio.getDate();
    var dataInicioMes = diaInicio.getMonth() + 1;
    var dataInicioAno = diaInicio.getFullYear();
    var dataInicioCompleta = dataInicioDia + '/' + dataInicioMes + '/' + dataInicioAno

    // PEGANDO A DATA FINAL COMPLETA PRO PERÍODO ------------------------------------------------------------------
    var diaTermino = new Date(treinamento.dataTermino);
    var dataTerminoDia = diaTermino.getDate();
    var dataTerminoMes = diaTermino.getMonth() + 1;
    var dataTerminoAno = diaTermino.getFullYear();
    var dataTerminoCompleta = dataTerminoDia + '/' + dataTerminoMes + '/' + dataTerminoAno

    // CONVERTENDO DATA PARA ESCRITO ------------------------------------------------------------------
    if (dataTerminoMes == 1){
      var dataTerminoMesEscrito = 'Janeiro';
    }
    else if (dataTerminoMes == 2){
      var dataTerminoMesEscrito = 'Fevereiro';
    }
    else if (dataTerminoMes == 3){
      var dataTerminoMesEscrito = 'Março';
    }
    else if (dataTerminoMes == 4){
      var dataTerminoMesEscrito = 'Abril';
    }
    else if (dataTerminoMes == 5){
      var dataTerminoMesEscrito = 'Maio';
    }
    else if (dataTerminoMes == 6){
      var dataTerminoMesEscrito = 'Junho';
    }
    else if (dataTerminoMes == 7){
      var dataTerminoMesEscrito = 'Julho';
    }
    else if (dataTerminoMes == 8){
      var dataTerminoMesEscrito = 'Agosto';
    }
    else if (dataTerminoMes == 9){
      var dataTerminoMesEscrito = 'Setembro';
    }
    else if (dataTerminoMes == 10){
      var dataTerminoMesEscrito = 'Outubro';
    }
    else if (dataTerminoMes == 11){
      var dataTerminoMesEscrito = 'Novembro';
    }
    else if (dataTerminoMes == 12){
      var dataTerminoMesEscrito = 'Dezembro';
    }

    // ESCOLHA DO MODELO ----------------------------------------------------------------
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
    doc.text('Certifico para os devidos fins, que ' + treinamento.nomeTripulante + ', portador do CPF 123.456.789-10, concluiu com êxito o curso ' + classificacao + ' de Piloto Privado de Avião nesta entidade, no período de ' + dataInicioCompleta + ' à ' + dataTerminoCompleta + ', com carga horária de 360 horas.', 40, 80, {maxWidth: 217, align: "justify"});
    //doc.text('Certifico para os devidos fins, que ' + treinamento.nomeTripulante + ', CPF 123.456.789-10, concluiu com êxito o curso ' + classificacao + ' de Piloto Privado de Avião nesta entidade, no período de ' + dataInicioCompleta + ' à ' + dataTerminoCompleta + ', com carga horária de 360 horas.', 40, 80, {maxWidth: 217, align: "justify"});

    doc.setFontSize(14);
    doc.text('Rio, ' + dataTerminoDia + ' de ' + dataTerminoMesEscrito + ' de ' + dataTerminoAno, 40, 140);
    
    doc.line(40, 170, 100, 170); // ASSINATURA INSTRUTOR
    doc.line(197, 170, 257, 170); // ASSINATURA TRIPULANTE

    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.setFont("century-gothic", "regular");
    doc.text('INSTRUTOR', 58, 176);

    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.setFont("century-gothic", "regular");
    doc.text('TRIPULANTE', 215, 176);



    // FOOTER
    const pageCount = doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      // Go to page i
      doc.setPage(i);
      // Print Page 1 of 4 for example
      doc.text('Página ' + String(i) + ' de ' + String(pageCount), 210 - 20, 297 - 20, null, "right");
    }
    
    doc.save('Certificado - ' + treinamento.nomeTripulante + '.pdf');
  }

}
