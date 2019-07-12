export interface IXAxisParams {
  chartDates: Array<number>;
}

export interface IYAxisParams {
  axisClass: string;
  axisTitle: string;
  minVal: number;
  maxVal: number;
  interval: number;
}

export interface IDefaultParams {
  chartType: string;
  chartZoom: 'x' | 'y' | 'xy';
}

export interface ITooltipParams {
  enabled: boolean;
  useHTML: boolean;
  animation: boolean;
  followPointer: boolean;
}

export interface ISeriesParams {
  stickyTracking: boolean;
  allowPointSelect: boolean;
  type: any;
  minSize: number;
  maxSize: number;
}
