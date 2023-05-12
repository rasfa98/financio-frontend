import { ChangeDetectorRef, Component, Input } from '@angular/core';
import Chart, { ChartComponent, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  @Input() id: string = '';
  @Input() data!: ChartData;
  @Input() options!: ChartOptions;

  public chart!: ChartComponent;

  ngAfterViewInit(): void {
    this.createChart();
    this.changeDetectorRef.detectChanges();
  }

  createChart(): void {
    const canvas: HTMLCanvasElement = document.querySelector(
      `canvas#${this.id}`
    ) as HTMLCanvasElement;

    if (canvas) {
      this.chart = new Chart(
        { canvas },
        {
          type: 'pie',
          data: this.data,
          options: {
            plugins: {
              tooltip: {
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || '';

                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed !== null) {
                      label = `${context.parsed} %`;
                    }
                    return label;
                  },
                },
              },
              legend: {
                display: false,
              },
            },
            elements: {
              arc: {
                borderWidth: 0,
              },
            },
            maintainAspectRatio: false,
            ...this.options,
          },
        }
      );
    }
  }
}