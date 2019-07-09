import {TooltipOptions} from 'highcharts';

export interface IBubbleOptions extends Highcharts.Options {
  tooltip: IBubbleTooltip;
}

export interface IBubbleTooltip extends TooltipOptions {
  events: {
    tooltipClick: (t, e) => void;
    tooltipMouseOut: (t) => void;
  };
}
