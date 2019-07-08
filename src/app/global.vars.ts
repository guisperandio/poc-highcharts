import {createCustomElement, NgElementConstructor} from '@angular/elements';
import {AreaChartComponent} from './area-chart/area-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {FunnelChartComponent} from './funnel-chart/funnel-chart.component';
import {CandleChartComponent} from './candle-chart/candle-chart.component';
import {BubbleChartComponent} from './bubble-chart/bubble-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
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
        name: 'app-area-chart',
        constructor: createCustomElement(AreaChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-pie-chart',
        constructor: createCustomElement(PieChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-bar-chart',
        constructor: createCustomElement(BarChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-funnel-chart',
        constructor: createCustomElement(FunnelChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-candle-chart',
        constructor: createCustomElement(CandleChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-bubble-chart',
        constructor: createCustomElement(BubbleChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-line-chart',
        constructor: createCustomElement(LineChartComponent, {
          injector: this.injector,
        }),
      },
    ];
  }

  get components() {
    return this.componentsArray;
  }
}
