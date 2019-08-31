import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule {}
