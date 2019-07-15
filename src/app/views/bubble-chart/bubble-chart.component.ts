import {Component, OnInit} from '@angular/core';
import {
  dateFormat,
  SeriesBubbleDataOptions,
  XAxisOptions,
  YAxisOptions,
  SeriesOptionsType,
  Chart,
} from 'highcharts';
import {AxisDates} from '@services/xaxis.service';
import {IBubbleOptions, IBubbleTooltip} from '@interfaces/tooltip.interface';
import {TAxisDates} from '@interfaces/xaxis.interface';
import {CurrencyPipe} from '@angular/common';
import {
  IDefaultParams,
  IXAxisParams,
  ITooltipParams,
  ISeriesParams,
  IYAxisParams,
} from '@interfaces/charts.interface';

@Component({
  templateUrl: './bubble-chart.component.html',
})
export class BubbleChartComponent implements OnInit {
  ticksInterval: TAxisDates = 'firstQuarter';
  chartData: Array<
    | [string | number, number]
    | [string | number, number, number]
    | SeriesBubbleDataOptions
  > = [];

  today: Date = new Date();

  chartParams: IBubbleOptions;
  chartPartialParams: Partial<IBubbleOptions>;

  yearSelected: number;

  constructor(private axisDates: AxisDates, private currency: CurrencyPipe) {}

  ngOnInit() {
    this.axisDates.updateYearSelection(2019);

    this.chartData = this.getChartData(300);
    this.chartPartialParams = this.getChartDefaultParams();
    this.chartPartialParams.yAxis = this.getYAxisParams();
    this.chartPartialParams.series = this.getSeriesParams();
    this.chartPartialParams.xAxis = this.getXAxisParams({
      chartDates: this.axisDates.getPeriod(this.ticksInterval),
    });
    this.chartPartialParams.tooltip = this.getTooltipParams({
      enabled: true,
      animation: true,
      useHTML: true,
      followPointer: false,
    });

    this.chartParams = this.getChartParams(this.chartPartialParams);
  }

  assign = (original: IBubbleOptions, changes: Partial<IBubbleOptions>) =>
    Object.assign({}, original, changes) as IBubbleOptions;

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  onClearChart = (chart: Chart) => {
    chart.tooltip.unpin();
    chart.tooltip.hide();
    chart.series.forEach(serie => {
      serie.update({
        type: 'bubble',
        allowPointSelect: true,
        className: 'bubble--point-unselected',
      });
      serie.points
        .filter(x => x.selected)
        .map(x => {
          x.select(false, false);
          return x;
        });
    });
  };

  onBlockChart = (chart: Chart) => {
    chart.tooltip.pin();
    chart.series[0].update({
      type: 'bubble',
      allowPointSelect: false,
      className: 'bubble--point-selected',
      marker: {
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    });
  };

  getChartData = (
    arraySize = 50
  ): Array<
    | [string | number, number]
    | [string | number, number, number]
    | SeriesBubbleDataOptions
  > => {
    const data: Array<
      | [string | number, number]
      | [string | number, number, number]
      | SeriesBubbleDataOptions
    > = [];

    [...Array(arraySize).keys()].forEach(num => {
      const yValue = this.getRandomNum(100); // dealScore value;
      const zValue = this.getRandomNum(100000); // amount value;
      data.push({
        x: Date.UTC(2019, this.getRandomNum(11), this.getRandomNum(31)), // random date
        y: yValue,
        z: zValue,
        text: `PipelineTest-${num}`,
        colorIndex: yValue < 70 ? (yValue < 40 ? 5 : 3) : 2,
      });
    });

    return data;
  };

  getChartDefaultParams = (
    params: Partial<IDefaultParams> = {
      chartType: 'bubble',
      chartZoom: 'xy',
    }
  ): Partial<IBubbleOptions> => {
    let defaultOptions: Partial<IBubbleOptions>;
    const onClearChart = this.onClearChart;
    defaultOptions = {
      chart: {
        type: params.chartType,
        plotBorderWidth: 1,
        zoomType: params.chartZoom,
        styledMode: true,
        shadow: false,
        className: params.chartType,
        events: {
          click() {
            if (this.tooltip.isPinned) {
              onClearChart(this);
            }
          },
        },
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

    return defaultOptions;
  };

  getXAxisParams = (params: IXAxisParams): XAxisOptions | XAxisOptions[] => {
    const format = dateFormat;

    let xAxisOptions: XAxisOptions | XAxisOptions[];

    xAxisOptions = {
      type: 'datetime',
      endOnTick: false,
      min: params.chartDates[0],
      max: params.chartDates[params.chartDates.length - 1],
      labels: {
        staggerLines: 1,
        formatter() {
          return format('%e <br> %b', this.value);
        },
      },
      tickPositioner: () => params.chartDates,
    };

    return xAxisOptions;
  };

  getYAxisParams = (
    params: Partial<IYAxisParams> = {
      axisClass: 'bubble-yAxis',
      axisTitle: 'DEAL SCORE',
      minVal: 0,
      maxVal: 100,
      interval: 20,
    }
  ): YAxisOptions | YAxisOptions[] => {
    let yAxisOptions: YAxisOptions | YAxisOptions[];

    yAxisOptions = {
      className: params.axisClass,
      startOnTick: true,
      endOnTick: false,
      title: {
        text: params.axisTitle,
      },
      labels: {
        format: '{value}',
      },
      maxPadding: 0.2,
      min: params.minVal,
      max: params.maxVal,
      tickInterval: params.interval,
    };

    return yAxisOptions;
  };

  getTooltipParams = (
    params: Partial<ITooltipParams> = {
      enabled: true,
      animation: true,
      useHTML: true,
      followPointer: false,
    }
  ): IBubbleTooltip => {
    const currency = this.currency;
    const onClearChart = this.onClearChart;
    let tooltipOptions: IBubbleTooltip;
    tooltipOptions = {
      enabled: params.enabled,
      animation: params.animation,
      useHTML: params.useHTML,
      crosshairs: false,
      formatter() {
        return `
        <div class="bubble bubble-tooltip">
          <div class="bubble-tooltip__score bubble-tooltip__score--${
            this.colorIndex
          }"><span class="bubble-tooltip__score-text">${
          this.point.y
        }</span></div>
          <div class="bubble-tooltip__info">
            <span class="bubble-tooltip__info-title">${this.point.text}</span>
            <span class="bubble-tooltip__info-amount">${currency.transform(
              this.point.z,
              'EUR',
              'symbol',
              '4.0'
            )}</span>
          </div>
          <div class="bubble-tooltip__close">x</div>
        </div>
        `;
      },
      followPointer: params.followPointer,
      hideDelay: 2,
      padding: 4,
      events: {
        tooltipClick: (tooltip, element: HTMLElement) => {
          if (element.className === 'bubble-tooltip__close') {
            onClearChart(tooltip.chart);
          }
        },
        tooltipMouseOut: tooltip => {},
      },
    };

    return tooltipOptions;
  };

  getSeriesParams = (
    params: Partial<ISeriesParams> = {
      stickyTracking: false,
      allowPointSelect: true,
      type: 'bubble',
      minSize: 10,
      maxSize: 80,
    }
  ): Array<SeriesOptionsType> => {
    let seriesOptions: Array<SeriesOptionsType>;
    let lastPointClicked: string;
    const onBlockChart = this.onBlockChart;
    seriesOptions = [
      {
        stickyTracking: params.stickyTracking,
        allowPointSelect: params.allowPointSelect,
        type: params.type,
        data: this.chartData,
        className: 'bubble--point-unselected',
        dataLabels: {
          enabled: false,
        },
        marker: {
          states: {
            hover: {
              enabled: true,
            },
          },
        },
        minSize: 10,
        maxSize: 80,
        point: {
          events: {
            click() {
              onBlockChart(this.series.chart);
              lastPointClicked = this.id;
            },
          },
        },
      },
    ];

    return seriesOptions;
  };

  getChartParams = (chartParams: Partial<IBubbleOptions>): IBubbleOptions => {
    let mergedParams: IBubbleOptions;
    mergedParams = this.assign(mergedParams, chartParams);

    return mergedParams;
  };

  setNewYear = (year: number) => {
    this.axisDates.updateYearSelection(year);

    this.chartPartialParams.xAxis = this.getXAxisParams({
      chartDates: this.axisDates.getPeriod(this.ticksInterval),
    });

    this.chartParams = this.getChartParams(this.chartPartialParams);
  };

  setNewPeriod = (period: TAxisDates) => {
    this.ticksInterval = period;

    this.chartPartialParams.xAxis = this.getXAxisParams({
      chartDates: this.axisDates.getPeriod((this.ticksInterval = period)),
    });

    this.chartParams = this.getChartParams(this.chartPartialParams);
  };
}
