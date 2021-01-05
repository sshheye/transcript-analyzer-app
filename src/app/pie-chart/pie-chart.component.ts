import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() strokeWidth: number = 12.5;
  @Input() diameter: number = 24;
  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
