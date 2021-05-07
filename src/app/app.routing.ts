import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);