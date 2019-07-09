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

    this.setChartParams();
  }

  setChartParams() {
    let pinned: boolean;
    let lastPointClicked: string;

    const ticks = this.axisDates[this.ticksInterval];
    const format = dateFormat;

    this.chartParams = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        styledMode: true,
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

      xAxis: {
        type: 'datetime',
        endOnTick: false,
        min: ticks[0],
        max: ticks[ticks.length - 1],
        labels: {
          staggerLines: 1,
          formatter() {
            return format('%e <br> %b', this.value);
          },
        },
        tickPositioner() {
          return ticks;
        },
      },

      yAxis: {
        className: 'bubble-yAxis',
        startOnTick: true,
        endOnTick: true,
        title: {
          text: 'Deal score',
        },
        labels: {
          format: '{value}',
        },
        maxPadding: 0.2,
        max: 100,
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<div class="bubble bubble-tooltip">',
        pointFormat: `
            <div class="bubble-tooltip__score"><span class="bubble-tooltip__score-text">{point.y}</span></div>
            <div class="bubble-tooltip__info">
              <span class="bubble-tooltip__title">{point.text}</span>
              <span class="bubble-tooltip__amount">€{point.z}</span>
            </div>
            <div class="bubble-tooltip__close">X</div>
          `,
        footerFormat: '</div>',
        followPointer: false,
        enabled: true,
        hideDelay: 0.5,
        style: {
          pointerEvents: 'auto',
        },
        events: {
          tooltipClick: (tooltip, event) => {
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
          },
          tooltipMouseOut: tooltip => {
            tooltip.hide();
          },
        },
      },
      plotOptions: {
        series: {
          keys: ['x', 'y', 'z', 'text', 'value'],
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
          pointInterval: 24 * 3600 * 1000, // one day
          pointStart: ticks[0],
        },
        bubble: {
          minSize: 10,
          maxSize: 50,
          point: {
            events: {
              click(event) {
                this.select(!this.selected, false);
                this.series.chart.tooltip[pinned ? 'unpin' : 'pin']();
                pinned = !pinned;
                lastPointClicked = event.point.id;
              },
            },
          },
        },
      },

      series: [
        {
          allowPointSelect: false,
          type: 'bubble',
          data: this.chartData,
        },
      ],
    };
  }

  onChangeInterval() {
    this.ticksInterval =
      this.ticksInterval === 'entireYear' ? 'firstQuarter' : 'entireYear';
    this.setChartParams();
  }
}
