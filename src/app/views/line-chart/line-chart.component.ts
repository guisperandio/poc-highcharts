import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit {
  chartParams: Highcharts.Options;

  constructor() {}

  ngOnInit() {
    this.chartParams = {
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2016',
      },

      subtitle: {
        text: 'Source: thesolarfoundation.com',
      },

      yAxis: {
        title: {
          text: 'Number of Employees',
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          type: 'line',
          name: 'Installation',
          data: this.getChartData(20),
        },
        {
          type: 'line',
          name: 'Manufacturing',
          data: this.getChartData(20),
        },
        {
          type: 'line',
          name: 'Sales & Distribution',
          data: this.getChartData(20),
        },
        {
          type: 'line',
          name: 'Project Development',
          data: this.getChartData(20),
        },
        {
          type: 'line',
          name: 'Other',
          data: this.getChartData(20),
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  getChartData = (arraySize = 50): Array<any> => {
    const data: Array<any> = [];

    [...Array(arraySize).keys()].forEach(num => {
      const yValue = this.getRandomNum(5000);
      data.push(yValue);
    });

    return data;
  };
}
