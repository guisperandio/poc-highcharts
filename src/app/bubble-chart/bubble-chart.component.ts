import {Component, OnInit, Input} from '@angular/core';
import {
  dateFormat,
  SeriesBubbleDataOptions,
  XAxisOptions,
  YAxisOptions,
  SeriesOptionsType,
} from 'highcharts';
import {AxisDates} from '@helpers/xaxis.helper';
import {IBubbleOptions, IBubbleTooltip} from 'src/interfaces/tooltip.interface';
import {TAxisDates} from 'src/interfaces/xaxis.interface';
import {CurrencyPipe} from '@angular/common';
import {
  IDefaultParams,
  IXAxisParams,
  ITooltipParams,
  ISeriesParams,
} from 'src/interfaces/charts.interface';

interface IYAxisParams {
  axisClass: string;
  axisTitle: string;
  minVal: number;
  maxVal: number;
  interval: number;
}

@Component({
  templateUrl: './bubble-chart.component.html',
})
export class BubbleChartComponent implements OnInit {
  @Input() ticksInterval: TAxisDates;
  @Input() chartData: Array<
    | [string | number, number]
    | [string | number, number, number]
    | SeriesBubbleDataOptions
  > = [];

  today: Date = new Date();
  chartParams: IBubbleOptions;
  chartPartialParams: Partial<IBubbleOptions>;

  constructor(private axisDates: AxisDates, private currency: CurrencyPipe) {}

  ngOnInit() {
    // TODO: Change this to BehaviorSubject
    this.axisDates.year = 2019;

    this.ticksInterval = this.ticksInterval
      ? this.ticksInterval
      : 'firstQuarter';

    this.chartData = this.getChartData();

    this.chartPartialParams = this.getChartDefaultParams();

    this.chartPartialParams.xAxis = this.getXAxisParams({
      chartDates: this.axisDates[this.ticksInterval],
    });

    this.chartPartialParams.yAxis = this.getYAxisParams();

    this.chartPartialParams.tooltip = this.getTooltipParams({
      enabled: true,
      animation: true,
      useHTML: true,
      followPointer: false,
    });

    this.chartPartialParams.series = this.getSeriesParams();

    this.chartParams = this.getChartParams(this.chartPartialParams);
  }

  assign = (original: IBubbleOptions, changes: Partial<IBubbleOptions>) =>
    Object.assign({}, original, changes) as IBubbleOptions;

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
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

    defaultOptions = {
      chart: {
        type: params.chartType,
        plotBorderWidth: 1,
        zoomType: params.chartZoom,
        styledMode: true,
        shadow: false,
        className: params.chartType,
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
      endOnTick: true,
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

    return tooltipOptions;
  };

  getSeriesParams = (
    params: Partial<ISeriesParams> = {
      stickyTracking: false,
      allowPointSelect: false,
      type: 'bubble',
      minSize: 10,
      maxSize: 80,
    }
  ): Array<SeriesOptionsType> => {
    let seriesOptions: Array<SeriesOptionsType>;
    let lastPointClicked: any;
    seriesOptions = [
      {
        stickyTracking: params.stickyTracking,
        allowPointSelect: params.allowPointSelect,
        type: params.type,
        data: this.chartData,
        dataLabels: {
          enabled: false,
        },
        minSize: 10,
        maxSize: 80,
        point: {
          events: {
            click(e) {
              console.log(lastPointClicked);
              if (e.target !== lastPointClicked) {
                lastPointClicked = e.target;
                this.series.chart.tooltip.pin();
                // if (this.series.chart.tooltip.isPinned) {
                //   this.series.chart.tooltip.unpin();
                //   this.series.chart.redraw();
                //   const interval = setInterval(() => {
                //     this.series.chart.tooltip.pin();
                //     clearInterval(interval);
                //   }, 300);
                // } else {
                //   this.series.chart.tooltip.pin();
                // }
              } else {
                // TODO:: When user clicks in other point it not showing the tooltip
                console.log('test');
                this.series.chart.redraw();
                this.series.chart.tooltip.unpin();
              }

              this.select(!this.selected, false);
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

  onChangeInterval = () => {
    this.ticksInterval =
      this.ticksInterval === 'entireYear' ? 'firstQuarter' : 'entireYear';

    // this.getXAxisParams();
    // this.getChartParams();
  };
}
