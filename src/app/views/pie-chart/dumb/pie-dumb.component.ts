import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-pie-dumb',
  templateUrl: './pie-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieDumbComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
