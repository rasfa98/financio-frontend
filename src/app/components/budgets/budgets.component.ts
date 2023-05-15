import { Component } from '@angular/core';
import {
  faEye,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Budget } from 'src/app/interfaces/budget';
import { NotificationType } from 'src/app/interfaces/notification';
import { BudgetService } from 'src/app/services/budget.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent {
  constructor(
    private budgetService: BudgetService,
    private notificationService: NotificationService
  ) {}

  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;
  faPlus = faPlus;

  budgets: Budget[] = [];
  isLoading: boolean = false;

  getRemainingAmount(budget: Budget): number {
    const sumExpenses = budget.expenses.reduce(
      (acc, curr) => (acc += curr.amount),
      0
    );

    return budget.amount - sumExpenses;
  }

  getNumberOfExpenses(budget: Budget): number {
    return budget.expenses.length;
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.budgetService.getBudgets().subscribe({
      next: (budgets) => (this.budgets = budgets),
      complete: () => (this.isLoading = false),
    });
  }

  removeBudget(budget: Budget): void {
    this.budgetService.removeBudget(budget).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'Budget removed',
          type: NotificationType.SUCCESS,
        });
        this.budgets = this.budgets.filter((b) => b.id !== budget.id);
      },
      error: () =>
        this.notificationService.showNotification({
          message: 'Error removing budget',
          type: NotificationType.ERROR,
        }),
    });
  }
}
