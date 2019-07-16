import {Component, OnInit} from '@angular/core';
import {
  SeriesBubbleDataOptions,
  XAxisOptions,
  YAxisOptions,
  SeriesOptionsType,
  Chart,
} from 'highcharts';
import {AxisDates} from '@services/xaxis.service';
import {IBubbleOptions, IBubbleTooltip} from '@interfaces/tooltip.interface';
import {TAxisDates} from '@interfaces/xaxis.interface';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {
  IDefaultParams,
  ITooltipParams,
  ISeriesParams,
  IYAxisParams,
  IUpdateParams,
} from '@interfaces/charts.interface';
import {GeneralHelper} from '@core/helpers/general.helper';

@Component({
  templateUrl: './bubble-chart.component.html',
})
export class BubbleChartComponent implements OnInit {
  chartData: Array<
    | [string | number, number]
    | [string | number, number, number]
    | SeriesBubbleDataOptions
  > = [];

  chartParams: IBubbleOptions;
  chartPartialParams: Partial<IBubbleOptions>;

  constructor(
    private axisDates: AxisDates,
    private generalHelper: GeneralHelper,
    private currency: CurrencyPipe,
    private date: DatePipe
  ) {}

  ngOnInit() {
    this.chartData = this.getChartData(25);
    this.chartPartialParams = this.getChartDefaultParams();
    this.chartPartialParams.yAxis = this.getYAxisParams();
    this.chartPartialParams.series = this.getSeriesParams();
    this.chartPartialParams.xAxis = this.getXAxisParams();
    this.chartPartialParams.tooltip = this.getTooltipParams({
      enabled: true,
      animation: true,
      useHTML: true,
      followPointer: false,
    });

    this.chartParams = this.getChartParams(this.chartPartialParams);
  }

  onUpdateParams = (
    params: Partial<IUpdateParams> = {
      type: 'bubble',
      allowPointSelect: true,
      className: 'bubble--point-unselected',
      hover: true,
    }
  ): SeriesOptionsType => {
    const chartUpdate = {
      type: params.type,
      allowPointSelect: params.allowPointSelect,
      className: params.className,
      marker: {
        states: {
          hover: {
            enabled: params.hover,
          },
        },
      },
    };

    return chartUpdate;
  };

  onClearChart = (chart: Chart) => {
    chart.tooltip.unpin();
    chart.tooltip.hide();
    chart.series.forEach(serie => {
      serie.update(this.onUpdateParams(), true);
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
    chart.series[0].update(
      this.onUpdateParams({
        allowPointSelect: true,
        className: 'bubble--point-selected',
        hover: false,
      }),
      true
    );
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
      const dealScore = this.generalHelper.getRandomNum(100);
      const amount = this.generalHelper.getRandomNum(100000);
      data.push({
        x: Date.UTC(
          2019,
          this.generalHelper.getRandomNum(11),
          this.generalHelper.getRandomNum(31)
        ), // random date
        y: dealScore,
        z: amount,
        text: `PipelineTest-${num}`,
        colorIndex: dealScore < 70 ? (dealScore < 40 ? 5 : 3) : 2,
      });
    });

    return data;
  };

  getChartDefaultParams = (
    params: Partial<IDefaultParams> = {
      chartType: 'bubble',
      chartZoom: 'xy',
      enableBoost: false,
      useGPU: false,
      usePreallocated: false,
      allowForce: false,
    }
  ): Partial<IBubbleOptions> => {
    let defaultOptions: Partial<IBubbleOptions>;
    const onClearChart = this.onClearChart;
    defaultOptions = {
      chart: {
        animation: true,
        className: params.chartType,
        plotBorderWidth: 1,
        shadow: false,
        styledMode: true,
        type: params.chartType,
        zoomType: params.chartZoom,
        events: {
          click() {
            if (this.tooltip.isPinned) {
              onClearChart(this);
            }
          },
        },
        spacingTop: 19,
      },

      boost: {
        enabled: params.enableBoost,
        useGPUTranslations: params.useGPU,
        usePreallocated: params.usePreallocated,
        allowForce: params.allowForce,
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

  getXAxisParams = (): XAxisOptions | XAxisOptions[] => {
    let xAxisOptions: XAxisOptions | XAxisOptions[];
    const ticks = this.axisDates.ticks;
    const today = this.axisDates.today;

    today.setHours(1, 0, 0, 0);
    xAxisOptions = {
      type: 'datetime',
      startOnTick: true,
      endOnTick: true,
      minTickInterval: 24 * 3600 * 1000,
      minRange: 24 * 3600 * 1000,
      tickPixelInterval: 211,
      tickPositioner() {
        if (this.userMax) {
          return this.tickPositions;
        } else {
          return ticks;
        }
      },
      dateTimeLabelFormats: {
        day: {
          main: '%e. %b',
        },
        month: {
          main: '%e. %b',
        },
        year: {
          main: '%b',
        },
      },
      plotLines: [
        {
          value: today.getTime(),
          label: {
            align: 'center',
            text: `
              <span class="highcharts-plot-line-label--bold">
                Today:
              </span>
              ${this.date.transform(today)}`,
            textAlign: 'center',
            useHTML: true,
            verticalAlign: 'top',
            x: 0,
            y: -7,
            rotation: 0,
          },
        },
      ],
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
        pointStart: Date.UTC(2019, 6, 1),
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
    mergedParams = this.generalHelper.assign(mergedParams, chartParams);

    return mergedParams;
  };

  setNewYear = (year: number) => {
    this.chartParams = this.getChartParams(this.chartPartialParams);
  };

  setNewPeriod = (period: TAxisDates) => {
    this.chartParams = this.getChartParams(this.chartPartialParams);
  };
}
