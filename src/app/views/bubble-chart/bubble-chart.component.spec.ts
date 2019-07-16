import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BubbleChartComponent} from './bubble-chart.component';
import {ChartComponent} from '@core/components/chart/chart.component';

// Highcharts Helpers
import '@helpers/tooltip.helper';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {BubbleDumbComponent} from './dumb/bubble-dumb.component';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

// Highcharts providers array
export function highchartsModules() {
  return [more, boost];
}

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [BubbleChartComponent, BubbleDumbComponent, ChartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CurrencyPipe,
        DatePipe,
        {
          provide: HIGHCHARTS_MODULES,
          useFactory: highchartsModules,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a random num of max value = 100', () => {
    const random = component.getRandomNum(100);
    expect(random).toBeLessThan(100);
  });

  it('should get a array with random data with lenght size = 100', () => {
    const arrayData = component.getChartData(100);
    expect(arrayData.length).toBe(100);
  });

  it('should get an object with chartType = bubble', () => {
    const defaultParams = component.getChartDefaultParams({
      chartType: 'bubble',
    });

    expect(defaultParams.chart.type).toBe('bubble');
  });

  it('should get an object with chart defaultParams', () => {
    const defaultParams = component.getChartDefaultParams();

    let testPassed = true;

    if (!defaultParams.chart) {
      testPassed = false;
    }

    if (!defaultParams.credits) {
      testPassed = false;
    }

    if (!defaultParams.legend) {
      testPassed = false;
    }

    if (!defaultParams.title) {
      testPassed = false;
    }

    expect(testPassed).toBeTruthy();
  });
});
