import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Fornecedor } from '../models/Fornecedor';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  fornecedor: Fornecedor = new Fornecedor();
  enderecoMap;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.fornecedor = this.route.snapshot.data['fornecedor'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?q='
                       + this.EnderecoCompleto() + '&key=AIzaSyABHLihHWmAOheF99OVL7ClFqLZmkOiHuc');
    }

    public EnderecoCompleto(): string {
      return this.fornecedor.endereco.logradouro + ', ' + this.fornecedor.endereco.numero + ' - ' + this.fornecedor.endereco.bairro
             + ', ' + this.fornecedor.endereco.cidade + ' - ' + this.fornecedor.endereco.estado;
    }

}
