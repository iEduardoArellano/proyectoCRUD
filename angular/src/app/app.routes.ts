import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './registro/registro.component';
import { ZombiesComponent } from './zombies/zombies.component';
import { CerebrosComponent } from './cerebros/cerebros.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    {path: 'zombies', component: ZombiesComponent},
    {path: 'cerebros', component: CerebrosComponent},
    { path: '**', component: NopagefoundComponent }
];
 
export const appRouting = RouterModule.forRoot(routes, {useHash: true});
