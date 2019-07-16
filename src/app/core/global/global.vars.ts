import {createCustomElement, NgElementConstructor} from '@angular/elements';
import {BubbleChartComponent} from '@views/bubble-chart/bubble-chart.component';
import {Injector, Injectable} from '@angular/core';
import {AreaChartComponent} from '@views/area-chart/area-chart.component';
import {PieChartComponent} from '@views/pie-chart/pie-chart.component';
import {BarChartComponent} from '@views/bar-chart/bar-chart.component';
import {LineChartComponent} from '@views/line-chart/line-chart.component';
import {FunnelChartComponent} from '@views/funnel-chart/funnel-chart.component';
import {CandleChartComponent} from '@views/candle-chart/candle-chart.component';

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
        name: 'app-bar-chart',
        constructor: createCustomElement(BarChartComponent, {
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
        name: 'app-candle-chart',
        constructor: createCustomElement(CandleChartComponent, {
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
        name: 'app-line-chart',
        constructor: createCustomElement(LineChartComponent, {
          injector: this.injector,
        }),
      },
      {
        name: 'app-pie-chart',
        constructor: createCustomElement(PieChartComponent, {
          injector: this.injector,
        }),
      },
    ];
  }

  get components() {
    return this.componentsArray;
  }
}
