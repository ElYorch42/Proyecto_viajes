import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

 
