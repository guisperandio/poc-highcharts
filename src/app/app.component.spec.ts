import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import {FusionChartsModule} from 'angular-fusioncharts';
import {ChartComponent} from './chart/chart.component';
import {FusionchartsComponent} from './fusioncharts/fusioncharts.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import * as more from 'highcharts/highcharts-more';
import * as exporting from 'highcharts/modules/exporting';
import * as exportData from 'highcharts/modules/export-data';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ChartComponent, FusionchartsComponent],
      imports: [ChartModule, FusionChartsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: HIGHCHARTS_MODULES,
          useFactory: () => [more, exporting, exportData],
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'poc-highcharts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('poc-highcharts');
  });
});
