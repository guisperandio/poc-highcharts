import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-candle-dumb',
  templateUrl: './candle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandleComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
