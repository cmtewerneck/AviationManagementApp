import { Component, OnInit, TemplateRef } from '@angular/core';
import { FornecedorService } from '../../../_services/fornecedor.service';
import { Fornecedor } from 'src/app/_models/Fornecedor';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  fornecedores: Fornecedor[];
  fornecedoresFiltrados: Fornecedor[];
  modalRef: BsModalRef;

  constructor(
    private fornecedorService: FornecedorService,
    private modalService: BsModalService
    ) { }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.fornecedoresFiltrados = this.filtroLista ? this.filtrarFornecedor(this.filtroLista) : this.fornecedores;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.ObterTodos();
  }

  filtrarFornecedor(filtrarPor: string): Fornecedor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.fornecedores.filter(
      fornecedor => fornecedor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ObterTodos() {
    this.fornecedorService.ObterTodos().subscribe(
      (_fornecedores: Fornecedor[]) => {
      this.fornecedores = _fornecedores;
      console.log(_fornecedores);
    }, error => {
        console.log(error);
    });
  }

}
