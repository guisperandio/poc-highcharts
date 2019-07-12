import {
  Component,
  OnChanges,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/compiler/src/core';
import {IBubbleOptions} from '@core/interfaces/tooltip.interface';
import {TAxisDates} from '@core/interfaces/xaxis.interface';

@Component({
  selector: 'app-bubble-dumb',
  templateUrl: './bubble-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleDumbComponent implements OnChanges, OnInit {
  @Input() yearSelected: number;
  @Input() chartParams: IBubbleOptions;

  @Output() emitNewYear: EventEmitter<number> = new EventEmitter<number>();
  @Output() emitNewPeriod: EventEmitter<TAxisDates> = new EventEmitter<
    TAxisDates
  >();

  ngOnChanges() {}

  ngOnInit() {}

  onChangeYear(year: string) {
    this.emitNewYear.emit(Number(year));
  }

  onChangePeriod(period: TAxisDates) {
    this.emitNewPeriod.emit(period);
  }
}
