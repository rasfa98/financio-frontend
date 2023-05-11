import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss'],
})
export class ViewBudgetComponent {
  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
  ) {}

  budget!: Budget;

  get sumExpenses(): number {
    return this.budget.expenses.reduce((acc, curr) => (acc += curr.amount), 0);
  }

  get remainingAmount(): number {
    return this.budget.amount - this.sumExpenses;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.budgetService.getBudget(id).subscribe((budget) => {
          this.budget = budget;
        });
      }
    });
  }

  getChartOptions(): ChartOptions {
    return {
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
    };
  }

  getExpensesChartData(): ChartData {
    return {
      labels: this.budget.expenses.map((expenses) => expenses.name),
      datasets: [
        {
          backgroundColor: this.budget.expenses.map(
            () =>
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
          ),
          data: this.budget.expenses.map(
            (expense) => (expense.amount / this.sumExpenses) * 100
          ),
        },
      ],
    };
  }
  getSpentChartData(): ChartData {
    return {
      labels: ['Spent', 'Remaining amount'],
      datasets: [
        {
          backgroundColor: ['red', 'green'],
          data:
            this.remainingAmount > 0
              ? [
                  (this.sumExpenses / this.budget.amount) * 100,
                  (this.remainingAmount / this.budget.amount) * 100,
                ]
              : [100, 0],
        },
      ],
    };
  }
}
