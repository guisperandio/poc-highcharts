import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {Chart, StockChart} from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges, OnInit {
  @Input() chartParams: Highcharts.Options;
  @Input() isStockChart: boolean;

  chartData: Chart | StockChart;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartParams && this.chartData) {
      this.chartData.ref.update(this.chartParams, true);
    }
  }

  ngOnInit() {
    this.isStockChart = Boolean(this.isStockChart);

    this.chartData = this.isStockChart
      ? new StockChart(this.chartParams)
      : new Chart(this.chartParams);
  }
}
