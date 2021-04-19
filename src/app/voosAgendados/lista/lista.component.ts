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

  vooAgendado: VooAgendado;
  public voosAgendados: VooAgendado[];
  errorMessage: string;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: "pt-br",
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    timeZone: 'local',
    eventTimeFormat: { // like '14:30'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,listWeek',
      center: 'title',
      right: 'prev,next today'
    },
    buttonText: {
      today: 'hoje',
      month: 'mês',
      week: 'semana',
      day: 'dia',
      list: 'lista'
    },
    dayMaxEvents: true, // allow "more" link when too many events
    eventClick: this.handleEventClick.bind(this),
    events: this.obterEventos.bind(this)
  };

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Você tem certeza que deseja deletar o agendamento '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleDateClick(arg) {
    alert('Data escolhida ' + arg.dateStr)
  }

  constructor(private vooAgendadoService: VooAgendadoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  obterEventos(info, successCallback, failureCallback) {

    console.log('info: ', info);

    this.vooAgendadoService.obterPorRange(info.startStr, info.endStr).subscribe(
      (voosAgendados: VooAgendado[]) => {
        console.log(voosAgendados);
        successCallback(voosAgendados);
      }, error => {
        console.log(error);
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        failureCallback(error);
      });
    
  }

}