import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';
import * as funnel from 'highcharts/modules/funnel';
import * as highstock from 'highcharts/modules/stock';

export function highchartsModules() {
  return [more, boost, funnel, highstock];
}

// FlexModule
import {FlexLayoutModule} from '@angular/flex-layout';

// Angular Custom Elements
import {ChartComponent} from './chart/chart.component';
import {AreaChartComponent} from './area-chart/area-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {FunnelChartComponent} from './funnel-chart/funnel-chart.component';
import {CandleChartComponent} from './candle-chart/candle-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {BubbleChartComponent} from './bubble-chart/bubble-chart.component';

// Global vars import
import {CustomElementsInterface, GlobalVars} from './global.vars';
import {AppComponent} from './app.component';

// DatePipe
import {DatePipe} from '@angular/common';

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
