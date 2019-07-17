import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BubbleChartComponent} from './bubble-chart.component';
import {ChartComponent} from '@core/components/chart/chart.component';

// Highcharts Helpers
import '@helpers/tooltip.helper';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {BubbleComponent} from './presentation/bubble.component';

// Highcharts imports
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as boost from 'highcharts/modules/boost';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {GeneralHelper} from '@core/helpers/general.helper';

// Highcharts providers array
export function highchartsModules() {
  return [more, boost];
}

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;
  const generalHelper: GeneralHelper = new GeneralHelper();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [BubbleChartComponent, BubbleComponent, ChartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CurrencyPipe,
        DatePipe,
        GeneralHelper,
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
    const random = generalHelper.getRandomNum(100);
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

  it('should chartType be "line"', () => {
    const params = component.getChartDefaultParams({chartType: 'line'});

    expect(params.chart.type).toBe('line');
  });

  it('should chartZoom be "x"', () => {
    const params = component.getChartDefaultParams({chartZoom: 'x'});

    expect(params.chart.zoomType).toBe('x');
  });

  it('should enable boost if boostEnabled is true', () => {
    const params = component.getChartDefaultParams({enableBoost: true});

    expect(params.boost.enabled).toBeTruthy();
  });

  it('should enable useGPUTranslations if useGPU is true', () => {
    const params = component.getChartDefaultParams({useGPU: true});

    expect(params.boost.useGPUTranslations).toBeTruthy();
  });

  it('should enable usePreallocated if usePreallocated is true', () => {
    const params = component.getChartDefaultParams({usePreallocated: true});

    expect(params.boost.usePreallocated).toBeTruthy();
  });

  it('should enable allowForce if allowForce is true', () => {
    const params = component.getChartDefaultParams({allowForce: true});

    expect(params.boost.allowForce).toBeTruthy();
  });
});
