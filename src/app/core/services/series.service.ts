import {Injectable} from '@angular/core';
import {
  ISeriesParams,
  ISeriesCategories,
} from '@core/interfaces/charts.interface';
import {SeriesBubbleDataOptions, Chart, SeriesOptionsType} from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  getSeriesOptions = ({
    id,
    name,
    params,
    chartData,
    callback,
  }: {
    id: ISeriesCategories;
    name: string;
    params: Partial<ISeriesParams>;
    chartData:
      | [string | number, number]
      | [string | number, number, number]
      | SeriesBubbleDataOptions;
    callback: (chart: Chart) => void;
  }) => {
    const options: SeriesOptionsType = {
      stickyTracking: params.stickyTracking,
      allowPointSelect: params.allowPointSelect,
      type: params.type,
      data: chartData,
      name,
      className: 'bubble--point-unselected',
      id,
      dataLabels: {
        enabled: false,
      },
      visible: id === 'commit' ? true : false,
      minSize: 10,
      maxSize: 80,
      point: {
        events: {
          click() {
            callback(this.series.chart);
          },
        },
      },
    };

    return options;
  };
}
