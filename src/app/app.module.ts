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

const firebaseConfig = {
  apiKey: '{{PASTE_YOUR_API_KEY}}',
  authDomain: '{{PASTE_YOUR_AUTH_DOMAIN}}',
  databaseURL: '{{PASTE_YOUR_DATABASE_URL}}',
  projectId: '{{PASTE_YOUR_PROJECT_ID}}',
  storageBucket: '{{PASTE_YOUR_STORAGE_BUCKET}}',
  messagingSenderId: '{{PASTE_YOUR_MESSAGING_SENDER_ID}}',
  appId: '{{PASTE_YOUR_APP_ID}}'
};

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule {}
