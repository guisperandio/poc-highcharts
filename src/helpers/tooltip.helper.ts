import * as Highcharts from 'highcharts';
import {ITooltip} from 'src/interfaces/tooltip.interface';

declare module 'highcharts' {
  interface Tooltip {
    isPinned: boolean;

    _hide(): void;
    _move(x: number, y: number, anchorX: number, anchorY: number): void;
    _refresh(pointOrPoints: Point | Point[], mouseEvent?: Event): void;

    pin(): void;
    unpin(): void;
  }
}

Highcharts.Tooltip.prototype.isPinned = false;

Highcharts.Tooltip.prototype._hide = () => {};
Highcharts.Tooltip.prototype._move = () => {};
Highcharts.Tooltip.prototype._refresh = () => {};

const H = Highcharts.Tooltip.prototype;

Highcharts.Tooltip.prototype.pin = () => {
  [H.hide, H._hide] = [H._hide, H.hide];
  [H.move, H._move] = [H._move, H.move];
  [H.refresh, H._refresh] = [H._refresh, H.refresh];

  H.isPinned = true;
};

Highcharts.Tooltip.prototype.unpin = () => {
  [H.hide, H._hide] = [H._hide, H.hide];
  [H.move, H._move] = [H._move, H.move];
  [H.refresh, H._refresh] = [H._refresh, H.refresh];

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
