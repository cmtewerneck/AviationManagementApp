import { Component } from '@angular/core';
import { LocalStorageUtils } from './utils/localStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  LocalStorage = new LocalStorageUtils();

  token: string = '';

  usuarioLogado(): boolean {
    this.token = this.LocalStorage.obterTokenUsuario();

    return this.token !== null;
  }
}
