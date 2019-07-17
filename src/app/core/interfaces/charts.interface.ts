export type ISeriesCategories =
  | 'commit'
  | 'closed'
  | 'pipeline'
  | 'bestCase'
  | 'ommited';

export interface ICategoriesForm {
  name: string;
  category: string | ISeriesCategories;
  length: number;
  checked: boolean;
}

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
  enableBoost: boolean;
  useGPU: boolean;
  usePreallocated: boolean;
  allowForce: boolean;
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

export interface IUpdateParams {
  type: any;
  allowPointSelect: boolean;
  className: string;
  hover: boolean;
}

export interface IEmitterInterface {
  value: boolean;
  type: string;
}
