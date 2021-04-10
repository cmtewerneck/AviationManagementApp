import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Aeronave } from '../models/Aeronave';
import { AeronaveService } from '../services/aeronave.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public aeronaves: Aeronave[];
  errorMessage: string;
  mostrarImagem = false;
  aeronaveId: string;
  errors: any[] = [];

  aeronave: Aeronave;
  aeronavesFiltrados: Aeronave[];

  constructor(private aeronaveService: AeronaveService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterTodos();
  }

  openModal(template: any, id: string) {
    template.show();
    this.aeronaveId = id;
    console.log(this.aeronaveId);
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.aeronavesFiltrados = this.filtroLista ? this.filtrarAeronave(this.filtroLista) : this.aeronaves;
  }

  filtrarAeronave(filtrarPor: string): Aeronave[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.aeronaves.filter(
      aeronave => aeronave.matricula.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  ObterTodos() {
    this.aeronaveService.obterTodos().subscribe(
      (_aeronaves: Aeronave[]) => {
      this.aeronaves = _aeronaves;
      this.aeronavesFiltrados = this.aeronaves;
    }, error => {
        this.toastr.error(`Erro de carregamento: ${error.error.errors}`);
        console.log(error);
    });
  }

  liberarAeronave(template: any) {
    this.aeronaveService.liberarAeronave(this.aeronaveId)
    .subscribe(
      aeronave => { 
        // const index = this.aeronaves.findIndex(x => x.id == this.aeronaveId);
        // this.aeronaves = this.aeronaves.splice(index, 1, aeronave);
        this.processarSucesso(aeronave) 
      },
      falha => { this.processarFalha(falha) }
      )
      template.hide();
   }

   pararAeronave(template: any) {
    this.aeronaveService.pararAeronave(this.aeronaveId)
    .subscribe(
      aeronave => { 
        // const index = this.aeronaves.findIndex(x => x.id == this.aeronaveId);
        // this.aeronaves = this.aeronaves.splice(index, 1, aeronave);
        this.processarSucesso(aeronave) 
      },
      falha => { this.processarFalha(falha) }
      )
      template.hide();
   }
    
    processarSucesso(response: any) {
      this.errors = [];
      this.toastr.success('Status alterado com sucesso!', 'Sucesso!');
      this.ObterTodos();
      this.aeronaveId = "";
    }
    
    processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
      this.aeronaveId = "";
    }
}
