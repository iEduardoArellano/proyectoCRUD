import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  name: string;
  email: string;
  password: string;
  picture: string;
  role: string;


  constructor(private _dataService: DataService,  private _appComponent: AppComponent, private router: Router) { }

  ngOnInit(): void {
    if (this._appComponent.loged){
      this.router.navigate(['dashboard']);
    }
  }

  registrar() {
    this._dataService.registrar(this.name, this.email, this.password, this.picture, this.role).subscribe((resultado) => {
      this._appComponent.loged = true;
      this.router.navigate(['dashboard']);
    }, (error) => {
      //console.log(error.error.message);
     // console.log(this.name, this.email, this.password, this.picture, this.role);
    });
  }

}
