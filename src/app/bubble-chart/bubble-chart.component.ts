import {Component, OnInit} from '@angular/core';
import {Tooltip} from 'highcharts';

@Component({
  templateUrl: './bubble-chart.component.html',
})
export class BubbleChartComponent implements OnInit {
  today: Date = new Date();
  chartParams: Highcharts.Options;
  constructor() {
    console.log(Tooltip);
  }

  ngOnInit() {
    let pinned: boolean;
    let lastPointClicked: string;
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
        dateTimeLabelFormats: {
          month: {main: '%b <br> %Y'},
        },
        min: Date.UTC(2019, 0, 1),
        max: Date.UTC(2019, 6, 1),
        minTickInterval: 30 * 24 * 3600 * 1000,
        minRange: 30 * 24 * 3600 * 1000,
        ordinal: false,
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
        headerFormat: '<div class="bubble-details">',
        pointFormat: `
            <div class="bubble-details__score"><span class="bubble-details__score-text">{point.y}</span></div>
            <div class="bubble-details__info">
              <span class="bubble-details__title">{point.text}</span>
              <span class="bubble-detgails__amount">{point.value}</span>
            </div>
          `,
        footerFormat: '</div>',
        followPointer: false,
      },
      plotOptions: {
        series: {
          keys: ['x', 'y', 'z', 'text', 'value'],
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },

      series: [
        {
          point: {
            events: {
              click(event) {
                this.series.chart.tooltip[pinned ? 'unpin' : 'pin']();
                if (event.point.id === lastPointClicked) {
                  this.series.chart.tooltip.hide();
                }
                pinned = !pinned;
                lastPointClicked = event.point.id;
              },
            },
          },
          allowPointSelect: true,
          type: 'bubble',
          data: [
            {
              x: Date.UTC(2019, 0, 15),
              y: 53,
              z: 12,
              text: 'PipelineTest',
              value: '€100.000',
            },
            {
              x: Date.UTC(2019, 1, 3),
              y: 23,
              z: 12,
              text: 'PipelineTest 2',
              value: '€50.000',
            },
          ],
        },
      ],
    };
  }
}
