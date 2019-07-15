import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/compiler/src/core';

@Component({
  selector: 'app-candle-dumb',
  templateUrl: './candle-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandleDumbComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
