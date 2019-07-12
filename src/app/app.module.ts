import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector} from '@angular/core';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';

// Highcharts Helpers
import '@helpers/tooltip.helper';

// Highcharts providers array
export function highchartsModules() {
  return [more, boost];
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
import {DatePipe, CurrencyPipe, AsyncPipe} from '@angular/common';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    BubbleChartComponent,
    BubbleDumbComponent,
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
  entryComponents: [AppComponent, BubbleChartComponent],
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
