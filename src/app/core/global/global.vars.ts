import {createCustomElement, NgElementConstructor} from '@angular/elements';
import {BubbleChartComponent} from '@views/bubble-chart/bubble-chart.component';
import {Injector, Injectable} from '@angular/core';

export interface CustomElementsInterface {
  name: string;
  constructor: NgElementConstructor<any>;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalVars {
  componentsArray: Array<CustomElementsInterface>;

  constructor(private injector: Injector) {
    this.componentsArray = [
      {
        name: 'app-bubble-chart',
        constructor: createCustomElement(BubbleChartComponent, {
          injector: this.injector,
        }),
      },
    ];
  }

  get components() {
    return this.componentsArray;
  }
}
