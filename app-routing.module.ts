import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomComponent } from './components/welcom/welcom.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { RunningComponent } from './components/running/running.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomComponent,
  },
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LogInComponent },
  { path: 'running', component: RunningComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
