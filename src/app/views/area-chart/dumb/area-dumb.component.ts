import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/compiler/src/core';

@Component({
  selector: 'app-area-dumb',
  templateUrl: './area-dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaDumbComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
