import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { enviroment } from '../enviroments/inviroments';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/modules/material/material.module';
import { SingupComponent } from './components/auth/singup/singup.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { RunningComponent } from './components/running/running.component';
import { CurrentRunningComponent } from './components/running/current-running/current-running.component';
import { NewRunningComponent } from './components/running/new-running/new-running.component';
import { HistoryRunningComponent } from './components/running/history-running/history-running.component';
import { WelcomComponent } from './components/welcom/welcom.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { StopRunningComponent } from './components/dilog/stop-running/stop-running.component';
import { DeleteDialogComponent } from './components/dilog/stop-running/delete-dialog/delete-dialog.component';
import { FormatTimePipe } from './pipes/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LogInComponent,
    RunningComponent,
    CurrentRunningComponent,
    NewRunningComponent,
    HistoryRunningComponent,
    WelcomComponent,
    HeaderComponent,
    SidenavListComponent,
    StopRunningComponent,
    DeleteDialogComponent,
    FormatTimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireModule.initializeApp(enviroment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
