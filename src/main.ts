import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core'; // Import enableProdMode
import { initializeApp } from 'firebase/app';
import { environment } from './enviroments/enviroments';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode(); // Enable production mode if necessary
}

// const app = initializeApp(environment.firebaseConfig); // Initialize Firebase here

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
