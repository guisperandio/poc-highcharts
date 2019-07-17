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
import {BubbleComponent} from '@views/bubble-chart/presentation/bubble.component';

// Global vars import
import {CustomElementsInterface, GlobalVars} from '@core/global/global.vars';
import {AppComponent} from './app.component';
import {ChartComponent} from '@components/chart/chart.component';

// DatePipe
import {DatePipe, CurrencyPipe} from '@angular/common';
import {createCustomElement} from '@angular/elements';

// Graph components
import {AreaChartComponent} from '@views/area-chart/area-chart.component';
import {AreaComponent} from '@views/area-chart/presentation/area.component';
import {BarChartComponent} from '@views/bar-chart/bar-chart.component';
import {BarComponent} from '@views/bar-chart/presentation/bar.component';
import {CandleChartComponent} from '@views/candle-chart/candle-chart.component';
import {CandleComponent} from '@views/candle-chart/presentation/candle.component';
import {FunnelChartComponent} from '@views/funnel-chart/funnel-chart.component';
import {FunnelComponent} from '@views/funnel-chart/presentation/funnel.component';
import {LineChartComponent} from '@views/line-chart/line-chart.component';
import {LineComponent} from '@views/line-chart/presentation/line.component';
import {PieChartComponent} from '@views/pie-chart/pie-chart.component';
import {PieComponent} from '@views/pie-chart/presentation/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    AreaChartComponent,
    AreaComponent,
    BarChartComponent,
    BarComponent,
    BubbleChartComponent,
    BubbleComponent,
    CandleChartComponent,
    CandleComponent,
    ChartComponent,
    FunnelChartComponent,
    FunnelComponent,
    LineChartComponent,
    LineComponent,
    PieChartComponent,
    PieComponent,
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
