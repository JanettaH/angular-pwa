import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private updates: SwUpdate) {
    if (!environment.production) {
      return;
    }

    this.updates.available.subscribe(() => {
      alert('new version available');
    });

    this.updates.activateUpdate().then(() => alert('activated update succeeded'));
    this.updates.activated.subscribe(() => {
      alert('new version activated');
    });
  }
}


/*    function intervalObservable(ms: number, duration: number) {
      return {
        subscribe: (next, error, complete) => {
          let i = 0;
          const id = setInterval(() => next(i++), ms, duration);
          setTimeout(() => {
            clearInterval(id);
            complete();
          }, duration);
          return {
            unsubscribe: () => {
              clearInterval(id);
            }
          };
        }
      };
    }

    const subscription = intervalObservable(1000, 5000).subscribe(
      console.log,
      console.error,
      () => console.log('Completed'),
    );

    //setTimeout(() => subscription.unsubscribe(), 5000);
  }*/
