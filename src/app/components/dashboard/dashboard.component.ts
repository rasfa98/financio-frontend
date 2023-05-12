import { Component } from '@angular/core';
import { Budget } from 'src/app/interfaces/budget';
import { BudgetService } from 'src/app/services/budget.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private budgetService: BudgetService,
    private notificationService: NotificationService
  ) {}

  budgets: Budget[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.budgetService.getBudgets().subscribe({
      next: (budgets) => (this.budgets = budgets),
      complete: () => (this.isLoading = false),
    });
  }
}
