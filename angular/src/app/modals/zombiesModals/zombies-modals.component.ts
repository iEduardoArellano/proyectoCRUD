import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'modal-zombies',
  templateUrl: './zombies-modals.component.html',
  styles: ['./zombies-modals.css'],
  encapsulation: ViewEncapsulation.None
})
export class ZombiesModalsComponent implements OnInit {
  @ViewChild('modal') public modal: ElementRef;
  nombre: string;
  email:string;
  tipo:string;
  error:string;
  formZ:FormGroup;
  
  

  constructor(private _dataService: DataService, private _renderer: Renderer2, private fb: FormBuilder) {
    this.formZ = fb.group({
      nombreZ: '',
      emailZ:'',
      tipoZ:''
    });
    
   }

  ngOnInit(): void {
    document.getElementById("errorZ").style.display="none";
  }



  guardarZombies(){
    this._dataService.agregarZombie(this.nombre, this.email, this.tipo).subscribe((resultado)=>{
      console.log(resultado);
      this._renderer.selectRootElement(this.modal.nativeElement, true).click();
      this._dataService.obtenerZombies();
      this.formZ.reset();
    },(error)=>{
      //Si hay error muestra el div con el mensaje
      document.getElementById("errorZ").style.display="block";
      this.error=error.error.tError;
      this.formZ.reset();
    })
    
  }
}

