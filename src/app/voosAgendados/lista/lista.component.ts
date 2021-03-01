import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VooAgendado } from '../models/VooAgendado';
import { VooAgendadoService } from '../services/vooAgendado.service';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    timeZone: 'local',
    eventTimeFormat: { // like '14:30'
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
    },
    dayMaxEvents: true, // allow "more" link when too many events
    eventClick: this.handleEventClick.bind(this),
    events: [
      { 
      // IMPLEMENTAR SERVIÇO PARA PEGAR OS EVENTOS
      // this.obterTodos();
    }
  ]
};

handleEventClick(clickInfo: EventClickArg) {
  if (confirm(`Você tem certeza que deseja deletar o agendamento '${clickInfo.event.title}'`)) {
    clickInfo.event.remove();
  }
}

handleDateClick(arg) {
  alert('Data escolhida ' + arg.dateStr)
}

public voosAgendados: VooAgendado[];
errorMessage: string;

vooAgendado: VooAgendado;
voosAgendadosFiltrados: VooAgendado[];

constructor(private vooAgendadoService: VooAgendadoService,
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
    this.voosAgendadosFiltrados = this.filtroLista ? this.filtrarVooAgendado(this.filtroLista) : this.voosAgendados;
  }
  
  filtrarVooAgendado(filtrarPor: string): VooAgendado[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.voosAgendados.filter(
      vooAgendado => vooAgendado.matriculaAeronave.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }
    
    ObterTodos() {
      this.vooAgendadoService.obterTodos().subscribe(
        (_voosAgendados: VooAgendado[]) => {
          this.voosAgendados = _voosAgendados;
          this.voosAgendadosFiltrados = this.voosAgendados;
        }, error => {
          this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
          console.log(error);
        });
      }
    }