import { RouterModule, Routes } from '@angular/router';
import { CitizenAreaComponent } from './features/citizen-area/citizen-area.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { AnalysisComponent } from './features/analysis/analysis.component';
import { HistoryComponent } from './features/analysis/history/history.component';
import { NotificationsComponent } from './features/analysis/notifications/notifications.component';
import { HomeComponent } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { isAuthenticatedGuard } from './core/security/auth.guard';
import { DetailsComponent } from './features/analysis/notifications/details/details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [isAuthenticatedGuard()],
    children: [
      {
        path: 'analysis',
        component: AnalysisComponent,
        children: [
          {
            path: 'notifications',
            component: NotificationsComponent
          },
          { path: 'notification/:id', component: DetailsComponent },
          
          {
            path: 'history',
            component: HistoryComponent
          }
        ]
      },
    ]
  },
  {
    path: 'citizen',
    component: CitizenAreaComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Habilite o modo History API (sem # na URL)
  exports: [RouterModule]
})
export class AppRoutingModule {}
