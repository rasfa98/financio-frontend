import { ChangeDetectorRef, Component, Input } from '@angular/core';
import Chart, { ChartComponent, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
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
          type: 'bar',
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
                    if (context.parsed.y !== null) {
                      label = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
              legend: {
                display: false,
              },
            },
            ...this.options,
          },
        }
      );
    }
  }
}
