import {TooltipOptions} from 'highcharts';

interface ITooltipEvents {
  tooltipClick?: (t: any, e: HTMLElement | EventTarget) => void;
  tooltipMouseOut?: (t: any) => void;
}
export interface IBubbleOptions extends Highcharts.Options {
  tooltip: IBubbleTooltip;
}
export interface IBubbleTooltip extends TooltipOptions {
  events: ITooltipEvents;
}

export interface ITooltip extends Highcharts.Tooltip {
  options: ITooltipOptions;
}

export interface ITooltipOptions extends Highcharts.TooltipOptions {
  events: ITooltipEvents;
}
