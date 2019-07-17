import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartComponent} from '../components/chart/chart.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more';
import * as exporting from 'highcharts/modules/exporting';
import * as exportData from 'highcharts/modules/export-data';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartModule],
      declarations: [ChartComponent],
      providers: [
        {
          provide: HIGHCHARTS_MODULES,
          useFactory: () => [more, exporting, exportData],
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
