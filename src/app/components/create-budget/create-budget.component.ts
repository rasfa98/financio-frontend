import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/budget';
import { NotificationType } from 'src/app/interfaces/notification';
import { BudgetService } from 'src/app/services/budget.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss'],
})
export class CreateBudgetComponent {
  constructor(
    private budgetService: BudgetService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit(budget: Budget): void {
    this.budgetService.createBudget(budget).subscribe({
      next: (budget) => {
        this.notificationService.showNotification({
          message: 'Budget created',
          type: NotificationType.SUCCESS,
        });
        this.router.navigateByUrl(`/budgets/${budget.id}/show`);
      },
      error: () =>
        this.notificationService.showNotification({
          message: 'Error creating budget',
          type: NotificationType.ERROR,
        }),
    });
  }
}
