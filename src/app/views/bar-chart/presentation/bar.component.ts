import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-bar-dumb',
  templateUrl: './bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
