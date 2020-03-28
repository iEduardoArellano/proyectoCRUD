import {SettingsService} from '../../services/settings.service'
import { Component, OnInit } from '@angular/core';
import{COLORS} from 'src/app/data/colors'



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  colors=COLORS;
  constructor(public _ajustes:SettingsService) { 

  }
  CambiarColor(color: string, element: string) {
    if (element === 'header') {
      this._ajustes.ajustes.temaEncabezado = color;
    } else if (element === 'sidebar') {
      this._ajustes.ajustes.temaMenuLateral = color;
    }
    this._ajustes.guardarAjustes();
  }


  ngOnInit(): void {
    this._ajustes.cargarAjustes();
  }

  seleccionar(event, element){
    console.log(event.target.dataset.class, element);
    this.CambiarColor(event.target.dataset.class, element); 
  }

}
