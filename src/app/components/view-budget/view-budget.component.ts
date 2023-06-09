import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData } from 'chart.js';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss'],
})
export class ViewBudgetComponent {
  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService,
    private notificationService: NotificationService
  ) {}

  budget!: Budget;
  isLoading: boolean = false;

  get sumExpenses(): number {
    return this.budget.expenses.reduce((acc, curr) => (acc += curr.amount), 0);
  }

  get remainingAmount(): number {
    return this.budget.amount - this.sumExpenses;
  }

  get progress(): number {
    return (this.sumExpenses / this.budget.amount) * 100;
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.budgetService.getBudget(id).subscribe({
          next: (budget) => (this.budget = budget),
          complete: () => (this.isLoading = false),
        });
      }
    });
  }

  getExpensesChartData(): ChartData {
    return {
      labels: this.budget.expenses.map((expenses) => expenses.name),
      datasets: [
        {
          backgroundColor: '#26a646',
          data: this.budget.expenses.map((expense) => expense.amount),
        },
      ],
    };
  }
}
