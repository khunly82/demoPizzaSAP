import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config'
import Nora from '@primeuix/themes/nora'

import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Nora
      }
    }),
    // afficher des boites de confirmation
    ConfirmationService,
    // afficher des messages (toast)
    MessageService,
    // afficher des dialog, modal
    DialogService,
  ]
};
