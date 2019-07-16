import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-line-dumb',
  templateUrl: './line-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineDumbComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
