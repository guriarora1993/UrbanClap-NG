import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

const app = initializeApp(environment.firebase);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
