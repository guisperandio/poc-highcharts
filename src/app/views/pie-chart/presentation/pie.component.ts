import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-pie-dumb',
  templateUrl: './pie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
