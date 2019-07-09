import * as Highcharts from 'highcharts';

declare module 'highcharts' {
  interface Tooltip {
    isPinned: boolean;

    pin<U>(): void;
    unpin<U>(): void;
  }
}
(H => {
  H.Tooltip.prototype.pin = function() {
    this._hide = this.hide;
    this._move = this.move;
    this._refresh = this.refresh;
    this.hide = () => {};
    this.move = () => {};
    this.refresh = () => {};

    this.isPinned = true;
  };
  H.Tooltip.prototype.unpin = function() {
    this.hide = this._hide;
    this.move = this._move;
    this.refresh = this._refresh;

    this.isPinned = false;
  };

  H.wrap(H.Tooltip.prototype, 'refresh', function(proceed) {
    const tooltip = this;
    const refreshArguments = arguments;

    proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));

    tooltip.label.on('click', e => {
      tooltip.options.events.tooltipClick(tooltip, e);
    });

    tooltip.label.on('mouseleave', e => {
      tooltip.options.events.tooltipMouseOut(tooltip);
    });
  });
})(Highcharts);
