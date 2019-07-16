import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector} from '@angular/core';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';
import * as funnel from 'highcharts/modules/funnel';
import * as stock from 'highcharts/modules/stock';

// Highcharts Helpers
import '@helpers/tooltip.helper';

// Highcharts providers array
export function highchartsModules() {
  return [more, boost, funnel, stock];
}

// FlexModule
import {FlexLayoutModule} from '@angular/flex-layout';

// Angular Custom Elements
import {BubbleChartComponent} from '@views/bubble-chart/bubble-chart.component';
import {BubbleDumbComponent} from '@views/bubble-chart/dumb/bubble-dumb.component';

// Global vars import
import {CustomElementsInterface, GlobalVars} from '@core/global/global.vars';
import {AppComponent} from './app.component';
import {ChartComponent} from '@components/chart/chart.component';

// DatePipe
import {DatePipe, CurrencyPipe} from '@angular/common';
import {createCustomElement} from '@angular/elements';

// Graph components
import {AreaChartComponent} from '@views/area-chart/area-chart.component';
import {AreaDumbComponent} from '@views/area-chart/dumb/area-dumb.component';
import {BarChartComponent} from '@views/bar-chart/bar-chart.component';
import {BarDumbComponent} from '@views/bar-chart/dumb/bar-dumb.component';
import {CandleChartComponent} from '@views/candle-chart/candle-chart.component';
import {CandleDumbComponent} from '@views/candle-chart/dumb/candle-dumb.component';
import {FunnelChartComponent} from '@views/funnel-chart/funnel-chart.component';
import {FunnelDumbComponent} from '@views/funnel-chart/dumb/funnel-dumb.component';
import {LineChartComponent} from '@views/line-chart/line-chart.component';
import {LineDumbComponent} from '@views/line-chart/dumb/line-dumb.component';
import {PieChartComponent} from '@views/pie-chart/pie-chart.component';
import {PieDumbComponent} from '@views/pie-chart/dumb/pie-dumb.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaChartComponent,
    AreaDumbComponent,
    BarChartComponent,
    BarDumbComponent,
    BubbleChartComponent,
    BubbleDumbComponent,
    CandleChartComponent,
    CandleDumbComponent,
    ChartComponent,
    FunnelChartComponent,
    FunnelDumbComponent,
    LineChartComponent,
    LineDumbComponent,
    PieChartComponent,
    PieDumbComponent,
  ],
  imports: [BrowserModule, ChartModule, FlexLayoutModule],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: highchartsModules,
    },
    GlobalVars,
    DatePipe,
    CurrencyPipe,
  ],
  entryComponents: [
    AppComponent,
    AreaChartComponent,
    BarChartComponent,
    BubbleChartComponent,
    CandleChartComponent,
    FunnelChartComponent,
    LineChartComponent,
    PieChartComponent,
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private global: GlobalVars, private injector: Injector) {
    const ctElements: Array<CustomElementsInterface> = this.global.components;
    ctElements.forEach(element =>
      customElements.define(element.name, element.constructor)
    );
  }
  ngDoBootstrap() {
    const elm = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('app-root', elm);
  }
}
