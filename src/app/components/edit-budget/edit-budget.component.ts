import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/budget';
import { NotificationType } from 'src/app/interfaces/notification';
import { BudgetService } from 'src/app/services/budget.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.scss'],
})
export class EditBudgetComponent {
  constructor(
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  budget!: Budget;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);

      if (id) {
        this.budgetService.getBudget(id).subscribe({
          next: (budget) => (this.budget = budget),
          complete: () => (this.isLoading = false),
        });
      }
    });
  }

  onSubmit(budget: Budget): void {
    this.budgetService.updateBudget(budget).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'Budget updated',
          type: NotificationType.SUCCESS,
        });
        this.router.navigateByUrl('/budgets');
      },
      error: () =>
        this.notificationService.showNotification({
          message: 'Error updating budget',
          type: NotificationType.ERROR,
        }),
    });
  }
}
