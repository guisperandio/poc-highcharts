import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-area-dumb',
  templateUrl: './area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
