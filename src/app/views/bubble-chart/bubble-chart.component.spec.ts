import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BubbleChartComponent} from './bubble-chart.component';
import {ChartComponent} from '@core/components/chart/chart.component';

// Highcharts Helpers
import '@helpers/tooltip.helper';
import {ChartModule} from 'angular-highcharts';
import {CurrencyPipe} from '@angular/common';
import {AxisDates} from '@core/services/xaxis.service';
import {BubbleDumbComponent} from './dumb/bubble-dumb.component';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [BubbleChartComponent, BubbleDumbComponent, ChartComponent],
      providers: [CurrencyPipe, AxisDates],
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
});
