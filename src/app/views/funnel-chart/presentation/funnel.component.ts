import {Component, OnChanges, Input, OnInit} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-funnel-dumb',
  templateUrl: './funnel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunnelComponent implements OnChanges, OnInit {
  @Input() chartParams: any;

  ngOnChanges() {}

  ngOnInit() {}
}
