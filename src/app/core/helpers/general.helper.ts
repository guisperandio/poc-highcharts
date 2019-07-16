import {Injectable} from '@angular/core';
import {IBubbleOptions} from '@core/interfaces/tooltip.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneralHelper {
  assign = (original: IBubbleOptions, changes: Partial<IBubbleOptions>) =>
    Object.assign({}, original, changes) as IBubbleOptions;

  getRandomNum = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };
}
