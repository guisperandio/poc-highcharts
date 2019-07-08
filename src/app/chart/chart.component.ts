import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Chart, StockChart} from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() chartParams: Highcharts.Options;
  @Input() isStockChart: boolean;

  chartData: Chart | StockChart;
  constructor() {}

  ngOnInit() {
    this.isStockChart = Boolean(this.isStockChart);

    this.chartData = this.isStockChart
      ? new StockChart(this.chartParams)
      : new Chart(this.chartParams);
  }
}
