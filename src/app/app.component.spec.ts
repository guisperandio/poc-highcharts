import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';
import * as funnel from 'highcharts/modules/funnel';
import * as highstock from 'highcharts/modules/stock';

// Highcharts Helpers
import '@helpers/tooltip.helper';

import {ChartComponent} from '@core/components/chart/chart.component';

// Highcharts providers array
export function highchartsModules() {
  return [more, boost, funnel, highstock];
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    const VERSION = '4711';
    TestBed.configureTestingModule({
      declarations: [AppComponent, ChartComponent],
      imports: [ChartModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: HIGHCHARTS_MODULES,
          useFactory: highchartsModules,
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Version: 4711'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Version: 4711');
  });
});
