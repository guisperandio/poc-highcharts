import {Component} from '@angular/core';
declare const VERSION: string;
@Component({
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = `Version: ${VERSION}`;
}
