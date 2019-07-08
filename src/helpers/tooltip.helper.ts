import * as Highcharts from 'highcharts';

declare module 'highcharts' {
  interface Tooltip {
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
  };
  H.Tooltip.prototype.unpin = function() {
    this.hide = this._hide;
    this.move = this._move;
    this.refresh = this._refresh;
  };
})(Highcharts);
