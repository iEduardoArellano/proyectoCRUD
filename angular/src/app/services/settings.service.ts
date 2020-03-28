import { Injectable, OnInit, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit {
  ajustes: Ajustes = {
    temaEncabezado: 'bg-primary header-text-light',
    temaMenuLateral: 'bg-primary sidebar-text-light'
  }

  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit(){
    this.cargarAjustes();
  }

  guardarAjustes() {
    console.log('Guardado en localstore');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  aplicar() {
    console.log('aplicando...');
    this._document
    .getElementsByClassName('app-header')[0]
    .setAttribute('class', 'app-header header-shadow' + this.ajustes.temaEncabezado);
    this._document
    .getElementsByClassName('app-sidebar')[0]
    .setAttribute('class', 'app-sidebar sidebar-shadow' + this.ajustes.temaMenuLateral);
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('cargando ajustes');
    } else {
      console.log('se cargaron ajustes');
    }

    this.aplicar();
  }
}

interface Ajustes {
  temaEncabezado: string;
  temaMenuLateral: string;
}
