import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

let apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private updateZombies$ = new Subject<any>();
  zombiesObservable = this.updateZombies$.asObservable();

  private updateCerebros$ = new Subject<any>();
  cerebrosObservable = this.updateCerebros$.asObservable();

  constructor(private _client: HttpClient) { }

  logear(email: string, password: string) {
    const usuario = {email, password};
    return this._client.post(apiUrl + 'usuario/login', usuario);
  }

  registrar(name: string, email: string, password: string, picture:string, role:string) {
    const usuario = {name, email, password,  picture, role};
    console.log(usuario);
    return this._client.post(apiUrl + 'usuario/registrar', usuario);
  }

  async obtenerZombies() {
    const zombies = await this._client.get<any>(apiUrl + 'zombies');
    console.log(zombies);
    return this.updateZombies$.next(zombies);
  }

  agregarZombie(nombre: string, email: string, tipo: string){
    const nuevoZombie = {name: nombre, email: email, type: tipo};
    return this._client.post(apiUrl + 'zombies/new', nuevoZombie);
  }

  eliminarZombies(id: string) {
    return this._client.post(apiUrl + 'zombies/delete/' + id, id);
  }

  editarZombie(nombre: string, email: string, tipo: string, id: string) {
    const nuevoZombie = {name: nombre, email: email, type: tipo};
    return this._client.put(apiUrl + 'zombies/edit/' + id, nuevoZombie);
  }

  async obtenerCerebros() {
    const cerebros = await this._client.get<any>(apiUrl + 'cerebro');
    console.log(cerebros);
    return this.updateCerebros$.next(cerebros);
  }

  agregarCerebros(flavor: string, description: string, iq: number, picture: string ) {
    const nuevoCerebro = {flavor, description, iq, picture};
    return this._client.post(apiUrl + 'cerebro/add', nuevoCerebro);
  }

  eliminarCerebros(id: string) {
    return this._client.post(apiUrl + 'cerebro/delete/' + id, id);
  }

  editarCerebros(flavor: string, description: string, iq: number, picture: string, id: string ) {
    const nuevoCerebro = {flavor, description, iq, picture};
    return this._client.put(apiUrl + 'cerebro/edit/' + id, nuevoCerebro);
  }
}
