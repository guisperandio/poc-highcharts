import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-bar-dumb',
  templateUrl: './bar-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarDumbComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
