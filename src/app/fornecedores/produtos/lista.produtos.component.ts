import { Component, Input } from '@angular/core';
import { Produto } from '../../produtos/models/Produto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'lista-produto',
  templateUrl: './lista.produtos.component.html'
})
export class ListaProdutosComponent {

  imagens: string = environment.imagensUrl;

  @Input()
  produtos: Produto[];
}