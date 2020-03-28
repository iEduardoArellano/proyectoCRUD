import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorL: any;

  constructor(private _dataService: DataService, private _appComponent: AppComponent,private router: Router) { }

  ngOnInit(): void {
    if (this._appComponent.loged){
      this.router.navigate(['dashboard']);
    }
  }

  logear() {
    this._dataService.logear(this.email, this.password).subscribe((resultado) => {
      console.log(resultado);
      this._appComponent.loged = true;
      this.router.navigate(['dashboard']);
    }, (error) => {
      this.errorL= error.error.errors;
      
      console.log(error);
    });
  }

}
