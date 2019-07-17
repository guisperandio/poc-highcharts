import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/compiler/src/core';
import {MatCheckboxChange} from '@angular/material';
import {
  IEmitterInterface,
  ICategoriesForm,
} from '@core/interfaces/charts.interface';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartFormComponent {
  @Input() categoriesForm: ICategoriesForm;
  @Output() checkboxEmitter: EventEmitter<
    IEmitterInterface
  > = new EventEmitter();

  onCheck = (event: MatCheckboxChange, type: string) => {
    this.checkboxEmitter.emit({value: event.checked, type});
  };
}
