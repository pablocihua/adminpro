import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from '../login/register.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
            { path: 'register', component: RegisterComponent, data: { title: 'Registro' }},
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficas' }},
            { path: 'promises', component: PromesasComponent, data: { title: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes del Tema' }},
            { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de usuario' }},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
