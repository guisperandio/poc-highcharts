import {
  Component,
  OnChanges,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {IBubbleOptions} from '@core/interfaces/tooltip.interface';
import {
  IEmitterInterface,
  ICategoriesForm,
} from '@core/interfaces/charts.interface';

@Component({
  selector: 'app-bubble-dumb',
  templateUrl: './bubble.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleComponent implements OnChanges, OnInit {
  @Input() yearSelected: number;
  @Input() chartParams: IBubbleOptions;
  @Input() categoriesForm: ICategoriesForm;

  @Output() checkboxEmitter: EventEmitter<
    IEmitterInterface
  > = new EventEmitter();

  ngOnChanges() {}

  ngOnInit() {}

  onCheck = (obj: IEmitterInterface) => {
    this.checkboxEmitter.emit({value: obj.value, type: obj.type});
  };
}
