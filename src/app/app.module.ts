import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';
import * as funnel from 'highcharts/modules/funnel';
import * as highstock from 'highcharts/modules/stock';

// Highcharts Helpers
import '@helpers/tooltip.helper';

// Highcharts providers array
export function highchartsModules() {
  return [more, boost, funnel, highstock];
}

// FlexModule
import {FlexLayoutModule} from '@angular/flex-layout';

// Angular Custom Elements
import {ChartComponent} from '@components/chart/chart.component';
import {AreaChartComponent} from '@components/area-chart/area-chart.component';
import {PieChartComponent} from '@components/pie-chart/pie-chart.component';
import {BarChartComponent} from '@components/bar-chart/bar-chart.component';
import {FunnelChartComponent} from '@components/funnel-chart/funnel-chart.component';
import {CandleChartComponent} from '@components/candle-chart/candle-chart.component';
import {LineChartComponent} from '@components/line-chart/line-chart.component';
import {BubbleChartComponent} from '@components/bubble-chart/bubble-chart.component';

// Global vars import
import {CustomElementsInterface, GlobalVars} from '@components/global.vars';
import {AppComponent} from '@components/app.component';

// DatePipe
import {DatePipe, CurrencyPipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    AreaChartComponent,
    PieChartComponent,
    BarChartComponent,
    FunnelChartComponent,
    CandleChartComponent,
    LineChartComponent,
    BubbleChartComponent,
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
    AreaChartComponent,
    PieChartComponent,
    BarChartComponent,
    FunnelChartComponent,
    CandleChartComponent,
    LineChartComponent,
    BubbleChartComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private global: GlobalVars) {
    const ctElements: Array<CustomElementsInterface> = this.global.components;
    ctElements.forEach(element =>
      customElements.define(element.name, element.constructor)
    );
  }
  ngDoBootstrap() {}
}
