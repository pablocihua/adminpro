import { RouterModule, Routes, CanActivate } from '@angular/router';

// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdminGuard, CheckTokenGuard } from '../services/service.index'; // LoginGuardGuard, 
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchingComponent } from './searching/searching.component';

const pagesRoutes: Routes = [
    // {
    //     path: '', component: PagesComponent,
    //     canActivate: [ LoginGuardGuard ],
    //     children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [ CheckTokenGuard ],
                data: { title: 'Dashboard' }
            },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficas' }},
            { path: 'promises', component: PromesasComponent, data: { title: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes del Tema' }},
            { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de usuario' }},
            { path: 'searching/:word', component: SearchingComponent, data: { title: 'Buscador' }},
            // Maintenance
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [
                    AdminGuard
                ],
                data: { title: 'Mantenimiento de usuarios' }
            },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de hospitales' }},
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de doctores' }},
            { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Actualizar doctor' }},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    //     ]
    // }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
