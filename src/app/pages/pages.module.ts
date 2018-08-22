import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementerComponent } from '../components/incrementer/incrementer.component';

// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementerComponent,
        GraficoDonaComponent,
        AccountSettingsComponent
    ],
    exports: {
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    },
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}
