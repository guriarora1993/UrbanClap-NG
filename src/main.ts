import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
<<<<<<< HEAD
import { enableProdMode } from '@angular/core'; // Import enableProdMode
import { initializeApp } from 'firebase/app';
import { environment } from './enviroments/enviroments';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode(); // Enable production mode if necessary
}

// const app = initializeApp(environment.firebaseConfig); // Initialize Firebase here

=======
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

const app = initializeApp(environment.firebase);
>>>>>>> 10ed98dc9245dc69eb5662940878387b63b25cac
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
