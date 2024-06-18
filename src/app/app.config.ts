import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loginInterceptor } from './pages/services/login.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideHttpClient(withInterceptors([loginInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
