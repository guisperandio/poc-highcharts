import {Component, OnInit, Input} from '@angular/core';
import {dateFormat} from 'highcharts';
import {AxisDates} from '@helpers/xaxis.helper';
import {IBubbleOptions} from 'src/interfaces/tooltip.interface';
import {TAxisDates} from 'src/interfaces/xaxis.interface';

@Component({
  templateUrl: './bubble-chart.component.html',
})
export class BubbleChartComponent implements OnInit {
  @Input() ticksInterval: TAxisDates;
  @Input() chartData: any;

  today: Date = new Date();
  chartParams: IBubbleOptions;
  chartPartialParams: Partial<IBubbleOptions>;

  assign = <T, U>(original: T, changes: U) =>
    Object.assign({}, original, changes) as T;

  constructor(private axisDates: AxisDates) {}

  ngOnInit() {
    this.axisDates.year = 2019;
    this.ticksInterval = this.ticksInterval
      ? this.ticksInterval
      : 'firstQuarter';

    this.chartData = [
      {
        x: Date.UTC(2019, 0, 15),
        y: 53,
        z: 100000,
        text: 'PipelineTest',
      },
      {
        x: Date.UTC(2019, 1, 3),
        y: 23,
        z: 50000,
        text: 'PipelineTest 2',
      },
      {
        x: Date.UTC(2019, 1, 6),
        y: 75,
        z: 200000,
        text: 'PipelineTest 2',
      },
    ];

    this.setChartDefaultParams();
    this.setXAxisParams();
    this.setYAxisParams();
    this.setTooltipParams();
    this.setPlotOptions();
    this.setSeriesParams();

    this.setChartParams();
  }

  setChartDefaultParams() {
    this.chartPartialParams = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        styledMode: true,
        className: 'bubble',
      },

      credits: {
        enabled: false,
      },

      legend: {
        enabled: false,
      },

      title: {
        text: null,
      },
    };
  }

  setXAxisParams() {
    const format = dateFormat;

    this.chartPartialParams.xAxis = {
      type: 'datetime',
      endOnTick: false,
      min: this.axisDates[this.ticksInterval][0],
      max: this.axisDates[this.ticksInterval][
        this.axisDates[this.ticksInterval].length - 1
      ],
      labels: {
        staggerLines: 1,
        formatter() {
          return format('%e <br> %b', this.value);
        },
      },
      tickPositioner: () => this.axisDates[this.ticksInterval],
    };
  }

  setYAxisParams() {
    this.chartPartialParams.yAxis = {
      className: 'bubble-yAxis',
      startOnTick: true,
      endOnTick: true,
      title: {
        text: 'DEAL SCORE',
      },
      labels: {
        format: '{value}',
      },
      maxPadding: 0.2,
      min: 0,
      max: 100,
      tickInterval: 20,
    };
  }

  setTooltipParams() {
    this.chartPartialParams.tooltip = {
      enabled: true,
      animation: true,
      useHTML: true,
      crosshairs: false,
      headerFormat: '<div class="bubble bubble-tooltip">',
      pointFormat: `
            <div class="bubble-tooltip__score"><span class="bubble-tooltip__score-text">{point.y}</span></div>
            <div class="bubble-tooltip__info">
              <span class="bubble-tooltip__title">{point.text}</span>
              <span class="bubble-tooltip__amount">€{point.z}</span>
            </div>
            <div class="bubble-tooltip__close">x</div>
          `,
      footerFormat: '</div>',
      followPointer: false,
      hideDelay: 0.5,
      style: {
        pointerEvents: 'auto',
      },
      events: {
        tooltipClick: (tooltip, element: HTMLElement) => {
          if (element.className === 'bubble-tooltip__close') {
            if (tooltip.isPinned) {
              tooltip.unpin();
            }
            tooltip.hide();
            tooltip.chart.series.forEach(serie => {
              serie.points
                .filter(x => x.selected)
                .map(point => {
                  point.select(false, false);
                  return point;
                });
            });
          }
        },
        tooltipMouseOut: tooltip => {},
      },
    };
  }

  setPlotOptions() {
    this.chartPartialParams.plotOptions = {
      series: {
        keys: ['x', 'y', 'z', 'text'],
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
        pointInterval: 24 * 3600 * 1000, // one day
        pointStart: this.axisDates[this.ticksInterval][0],
        enableMouseTracking: true,
        stickyTracking: false,
      },
      bubble: {
        minSize: 10,
        maxSize: 50,
        point: {
          events: {
            click() {
              this.select(!this.selected, false);
              this.series.chart.tooltip.isPinned
                ? this.series.chart.tooltip.unpin()
                : this.series.chart.tooltip.pin();
            },
          },
        },
      },
    };
  }

  setSeriesParams() {
    this.chartPartialParams.series = [
      {
        allowPointSelect: false,
        type: 'bubble',
        data: this.chartData,
      },
    ];
  }

  setChartParams() {
    this.chartParams = this.assign(this.chartParams, this.chartPartialParams);
  }

  onChangeInterval() {
    this.ticksInterval =
      this.ticksInterval === 'entireYear' ? 'firstQuarter' : 'entireYear';

    this.setXAxisParams();
    this.setChartParams();
  }
}
