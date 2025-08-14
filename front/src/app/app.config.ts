import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';


const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),  
        {
            provide:HTTP_INTERCEPTORS,
            useClass:AddTokenInterceptor,
            multi:true
        },
        { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }

  ]
};
