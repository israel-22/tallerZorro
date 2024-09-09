import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideNzIcons(icons), provideNzI18n(en_US),
     importProvidersFrom(FormsModule), provideAnimationsAsync(),
     provideHttpClient(),
         provideFirebaseApp(() => initializeApp({"projectId":"app-chocolate-da639",
          "appId":"1:606470027847:web:aeaf26ad63db0bd3cbcf62","storageBucket":"app-chocolate-da639.appspot.com",
          "apiKey":"AIzaSyDBounxyHIudKFOaraIOCjD-xJ8IrBefOo","authDomain":"app-chocolate-da639.firebaseapp.com",
          "messagingSenderId":"606470027847","measurementId":"G-7LS2F1FQJS"})), provideAuth(() => getAuth()),
           provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService,
           provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
