import * as Highcharts from 'highcharts';
import {ITooltip} from '@interfaces/tooltip.interface';

declare module 'highcharts' {
  interface Tooltip {
    isPinned: boolean;

    pin(): void;
    unpin(): void;
  }

  interface Axis {
    userMax: number;
    userMin: number;
  }
}

Highcharts.Tooltip.prototype.isPinned = false;

const dHide = Highcharts.Tooltip.prototype.hide;
const dMove = Highcharts.Tooltip.prototype.move;
const dRefresh = Highcharts.Tooltip.prototype.refresh;

const H = Highcharts.Tooltip.prototype;

Highcharts.Tooltip.prototype.pin = () => {
  H.hide = () => {};
  H.move = () => {};
  H.refresh = () => {};

  H.isPinned = true;
};

Highcharts.Tooltip.prototype.unpin = () => {
  H.hide = dHide;
  H.move = dMove;
  H.refresh = dRefresh;

  H.isPinned = false;
};

Highcharts.wrap(Highcharts.Tooltip.prototype, 'refresh', function(proceed) {
  const tooltip: ITooltip = this;
  const tooltipLabel = tooltip.getLabel();
  const refreshArguments = arguments;

  proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));

  tooltipLabel.on('click', (e: MouseEvent) => {
    tooltip.options.events.tooltipClick(tooltip, e.target);
  });

  tooltipLabel.on('mouseleave', () => {
    tooltip.options.events.tooltipMouseOut(tooltip);
  });
});
