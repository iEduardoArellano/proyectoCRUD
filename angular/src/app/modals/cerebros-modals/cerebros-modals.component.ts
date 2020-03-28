import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'cerebros-modals',
  templateUrl: './cerebros-modals.component.html',
  styleUrls: ['./cerebros-modals.component.css']
})
export class CerebrosModalsComponent implements OnInit {
  cerebros: any;
  sabor: string;
  descripcion: string;
  iq: number;
  foto: string;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  guardarCerebro(){
    console.log(this.sabor, this.descripcion, this.iq, this.foto);
    this.dataService.agregarCerebros(this.sabor, this.descripcion, this.iq, this.foto).subscribe((resultado)=>{
      console.log(resultado);
      this.dataService.obtenerCerebros();
    })
  }

}
